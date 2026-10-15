'use client';

import { MeshGradient } from '@paper-design/shaders-react';

export default function HeroMeshRenderer({ playing }: { playing: boolean }) {
  return <MeshGradient
    colors={['#F0B90B', '#111820', '#F5D777', '#6D5411']}
    distortion={0.45}
    swirl={0.2}
    grainMixer={0}
    grainOverlay={0}
    speed={playing ? 0.12 : 0}
    width="100%"
    height="100%"
    minPixelRatio={1}
    maxPixelCount={220000}
    className="hero-mesh-canvas"
  />;
}
