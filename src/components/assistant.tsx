/**
 * <Assistant /> — DEFERRED mount point.
 *
 * Currently a no-op (returns null). Reserved so a future RAG chatbot over
 * Stefano's bio can be added without re-plumbing the layout.
 *
 * Why server component?
 *   It renders nothing right now → zero client-side JS bundled. The day
 *   you flip this to interactive, add `"use client"` at the top and
 *   replace the `return null`.
 *
 * Where it mounts
 *   Inside src/app/[locale]/layout.tsx, as a sibling of the page <main>.
 *   Mounting in the layout (not per-page) means every locale gets it
 *   automatically and section components stay decoupled.
 *
 * --------------------------------------------------------------------
 * Integration recipe (when you're ready to ship the chatbot)
 * --------------------------------------------------------------------
 *
 * 1. Add the Groq key to Vercel:
 *      Vercel → Project → Settings → Environment Variables
 *      GROQ_API_KEY = sk-...
 *      Apply to: Production + Preview (NOT Development unless local dev)
 *
 * 2. Install the Groq SDK:
 *      bun add groq-sdk
 *
 * 3. Create the API route at src/app/api/assistant/route.ts:
 *      import Groq from 'groq-sdk';
 *      import { en } from '@/content/en';
 *      // Build a system prompt from en (single source of truth for facts).
 *      // Use Stefano's bio + the 6 metrics + the 4 principles as RAG context.
 *      // Stream the response with edge runtime if Groq's API supports it.
 *
 * 4. Flip this file to "use client" and replace the null return:
 *      - Floating button (FAB) bottom-right, gold filled, lucide MessageSquare
 *      - Click opens a shadcn Dialog or Drawer
 *      - Maintain chat state with useReducer or a small Zustand store
 *      - aria-live="polite" on the message list for screen readers
 *      - Respect prefers-reduced-motion (no opening transitions on reduced)
 *      - Send each user message to /api/assistant via fetch; render streamed
 *        tokens as they arrive
 *
 * 5. A11y checklist for the live component (don't skip):
 *      - Trigger button: aria-label="Ask the assistant" + visible focus ring
 *      - Dialog: focus trap + Esc closes (shadcn Dialog handles both)
 *      - Message list: role="log" + aria-live="polite"
 *      - Input: <label> with sr-only text + aria-describedby for hints
 *      - Loading state: aria-busy="true" on the message list while streaming
 *
 * If this file grows beyond ~200 lines, split the chat-state hook into
 * src/hooks/use-assistant.ts.
 *
 * Easy to delete: removing this single file + the one import in
 * layout.tsx removes the assistant cleanly.
 */
export function Assistant() {
  return null;
}
