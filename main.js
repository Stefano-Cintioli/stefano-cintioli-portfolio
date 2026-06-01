/* =============================================================
   Stefano Cintioli — Personal site
   IIFE pattern (no ES modules — works on file://, FTP, Vercel)
   ============================================================= */

(function () {
  "use strict";

  // ---------- Helpers ----------
  const $  = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  function getByPath(obj, path) {
    if (!obj || !path) return undefined;
    return path.split(".").reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, obj);
  }


  // ---------- State ----------
  const SUPPORTED_LANGS = ["en", "es", "pt"];
  const DEFAULT_LANG = "en";
  const TABS = ["tools", "impact", "socials"];
  const DEFAULT_TAB = "tools";

  let content = null;     // populated from content.json
  let currentLang = DEFAULT_LANG;


  // ---------- i18n ----------
  function applyLang(lang) {
    if (!content || !content[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach(function (el) {
      const key = el.dataset.i18n;
      const value = getByPath(content[lang], key);
      if (typeof value === "string") {
        el.textContent = value;
      }
    });

    $$(".lang-toggle button").forEach(function (btn) {
      const isActive = btn.dataset.lang === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    updateLangStatus(lang);

    try {
      localStorage.setItem("sc.lang", lang);
    } catch (_) { /* private mode etc. */ }
  }

  function updateLangStatus(lang) {
    const status = $("[data-lang-status]");
    if (!status) return;
    const meta = content && content._meta;
    if (lang === "pt" && meta && meta.ptDraft) {
      status.textContent = meta.ptDraftLabel || "PT translation · draft pending review";
      status.hidden = false;
    } else {
      status.hidden = true;
      status.textContent = "";
    }
  }


  // ---------- Footer last-updated ----------
  function initLastUpdated() {
    const el = $("[data-last-updated]");
    if (!el) return;
    // document.lastModified is a localized date string from the server's
    // Last-Modified header (or the file mtime when served by python http.server).
    const d = new Date(document.lastModified);
    if (isNaN(d.getTime())) return;
    const iso = d.toISOString().slice(0, 10);  // YYYY-MM-DD
    el.textContent = iso;
  }

  function initLangToggle() {
    $$(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lang = btn.dataset.lang;
        if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
        applyLang(lang);
      });
    });
  }

  function pickInitialLang() {
    // 1. localStorage preference
    try {
      const stored = localStorage.getItem("sc.lang");
      if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    } catch (_) { /* noop */ }

    // English-first by default — global recruiter audience.
    // The toggle still offers ES/PT; the user's choice is remembered in localStorage.
    return DEFAULT_LANG;
  }


  // ---------- Tabs (with #hash deep-link write) ----------
  function activateTab(tabName, options) {
    options = options || {};
    if (TABS.indexOf(tabName) === -1) return;

    $$('[role="tab"][data-tab]').forEach(function (btn) {
      const isActive = btn.dataset.tab === tabName;
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.tabIndex = isActive ? 0 : -1;
    });

    $$('[role="tabpanel"]').forEach(function (panel) {
      const matches = panel.id === "panel-" + tabName;
      panel.hidden = !matches;
    });

    if (options.updateHash) {
      const newHash = "#" + tabName;
      if (window.location.hash !== newHash) {
        history.replaceState(null, "", newHash);
      }
    }

    if (options.focus) {
      const btn = $('[role="tab"][data-tab="' + tabName + '"]');
      if (btn) btn.focus();
    }
  }

  function readInitialTab() {
    const hash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
    if (TABS.indexOf(hash) !== -1) return hash;
    return DEFAULT_TAB;
  }

  function initTabs() {
    const list = $('[role="tablist"]');
    if (!list) return;

    list.addEventListener("click", function (e) {
      const btn = e.target.closest('[role="tab"][data-tab]');
      if (!btn) return;
      activateTab(btn.dataset.tab, { updateHash: true });
    });

    // Arrow-key navigation within the tablist
    list.addEventListener("keydown", function (e) {
      const btn = e.target.closest('[role="tab"][data-tab]');
      if (!btn) return;
      const idx = TABS.indexOf(btn.dataset.tab);
      if (idx === -1) return;

      let next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next = TABS[(idx + 1) % TABS.length];
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        next = TABS[(idx - 1 + TABS.length) % TABS.length];
      } else if (e.key === "Home") {
        next = TABS[0];
      } else if (e.key === "End") {
        next = TABS[TABS.length - 1];
      }
      if (next) {
        e.preventDefault();
        activateTab(next, { updateHash: true, focus: true });
      }
    });

    // Browser back/forward respects the hash
    window.addEventListener("hashchange", function () {
      const hash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
      if (TABS.indexOf(hash) !== -1) {
        activateTab(hash, { updateHash: false });
      }
    });

    // First paint: respect the hash if present, otherwise default tab
    const initial = readInitialTab();
    // If the hash matched a tab, scroll the Work section into view smoothly
    activateTab(initial, { updateHash: false });
    if (TABS.indexOf((window.location.hash || "").replace(/^#/, "").toLowerCase()) !== -1) {
      const work = document.getElementById("work");
      if (work) {
        // Delay slightly to avoid fighting with browser's default jump
        setTimeout(function () {
          work.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
          });
        }, 60);
      }
    }
  }


  // ---------- Sticky header shadow ----------
  function initHeaderScroll() {
    const header = $("[data-header]");
    if (!header) return;
    const apply = function () {
      if (window.scrollY > 24) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }


  // ---------- Smooth-scroll anchors (skip the tab hashes) ----------
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      // If the anchor is a tab hash, let the tab system handle it
      const tabName = id.replace(/^#/, "").toLowerCase();
      if (TABS.indexOf(tabName) !== -1) {
        e.preventDefault();
        activateTab(tabName, { updateHash: true });
        const work = document.getElementById("work");
        if (work) work.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        return;
      }
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      // history update (preserve deep-link feel)
      try { history.replaceState(null, "", id); } catch (_) { /* noop */ }
    });
  }


  // ---------- Mouse-reactive gradient (hero only, rAF lerp) ----------
  function initMouseGradient() {
    const hero = $("[data-mouse-gradient]");
    if (!hero) return;
    // Skip on coarse pointers — touch users get a static gradient instead
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mx = 30, my = 30;        // current (lerped) %
    let tx = 30, ty = 30;        // target %
    let inView = true;
    let raf = null;

    const io = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView && raf == null) raf = requestAnimationFrame(loop);
    }, { threshold: 0 });
    io.observe(hero);

    hero.addEventListener("mousemove", function (e) {
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      tx = Math.max(0, Math.min(100, x));
      ty = Math.max(0, Math.min(100, y));
      if (raf == null) raf = requestAnimationFrame(loop);
    }, { passive: true });

    hero.addEventListener("mouseleave", function () {
      // ease back toward original idle position
      tx = 30; ty = 30;
      if (raf == null) raf = requestAnimationFrame(loop);
    });

    const lerp = reduced ? 0.18 : 0.06;

    function loop() {
      mx += (tx - mx) * lerp;
      my += (ty - my) * lerp;
      hero.style.setProperty("--mx", mx.toFixed(2) + "%");
      hero.style.setProperty("--my", my.toFixed(2) + "%");
      // Stop the loop once we're settled to save CPU
      const settled = Math.abs(tx - mx) < 0.05 && Math.abs(ty - my) < 0.05;
      if (settled || !inView) {
        raf = null;
      } else {
        raf = requestAnimationFrame(loop);
      }
    }

    // Initial idle position
    hero.style.setProperty("--mx", "30%");
    hero.style.setProperty("--my", "30%");
  }


  // ---------- Content fetch ----------
  function loadContent() {
    return fetch("content.json?v=20260525", { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error("content.json " + res.status);
        return res.json();
      })
      .then(function (json) {
        content = json;
        const lang = pickInitialLang();
        applyLang(lang);
      })
      .catch(function (err) {
        // Graceful degradation: hardcoded EN already in HTML, just log
        console.warn("[content.json] using hardcoded EN fallback:", err.message);
      });
  }


  // ---------- Boot ----------
  function boot() {
    safe(initHeaderScroll, "initHeaderScroll");
    safe(initTabs, "initTabs");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initLangToggle, "initLangToggle");
    safe(initMouseGradient, "initMouseGradient");
    safe(initLastUpdated, "initLastUpdated");
    safe(loadContent, "loadContent");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
