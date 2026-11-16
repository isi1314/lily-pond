import { PAINTING } from './painting'

// La Farge's water lily hung on Glowster's night-ink wall, shown at or near its own size so it
// stays sharp (stretched edge to edge, the 2553 px scan read as a low-resolution photo).
// What moves: a pool of gallery light breathing on the wall and sunlight drifting across the
// painting's water (no ripples: the owner did not like moving rings, 2026-11-16). CSS only, slow, still under reduced motion.

// The painting's box in the scene's 1600 by 1000 frame: centred, 780 high.
const X = 411
const Y = 100
const S = 778

const at = (fx: number, fy: number) => [X + S * fx, Y + S * fy] as const

const dapple = (fx: number, fy: number, rx: number, ry: number, cls: string, delay: number) => {
  const [cx, cy] = at(fx, fy)
  return `<ellipse class="${cls}" style="animation-delay:${delay}s" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#sun)"/>`
}

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
<style>
.light{animation:light 18s ease-in-out infinite alternate}
.drift-a{animation:drift-a 38s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
.drift-b{animation:drift-b 51s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
.hung{transform-box:view-box;transform-origin:800px 490px}
@keyframes light{from{opacity:.55}to{opacity:1}}
@keyframes drift-a{from{transform:translate(-40px,6px);opacity:.35}50%{opacity:.85}to{transform:translate(60px,-8px);opacity:.4}}
@keyframes drift-b{from{transform:translate(50px,0);opacity:.3}50%{opacity:.75}to{transform:translate(-55px,10px);opacity:.35}}
@media (max-aspect-ratio:1/1){.hung{transform:scale(.5)}}
@media (prefers-reduced-motion:reduce){.light,.drift-a,.drift-b{animation:none}.drift-a,.drift-b{opacity:.5}}
</style>
<defs>
<radialGradient id="pool" cx=".5" cy=".38" r=".55">
<stop offset="0" stop-color="#4a3b2d" stop-opacity=".9"/><stop offset=".55" stop-color="#2a221b" stop-opacity=".5"/><stop offset="1" stop-color="#14110e" stop-opacity="0"/>
</radialGradient>
<radialGradient id="sun" cx=".5" cy=".5" r=".5">
<stop offset="0" stop-color="#fff4d6" stop-opacity=".42"/><stop offset="1" stop-color="#fff4d6" stop-opacity="0"/>
</radialGradient>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feGaussianBlur stdDeviation="22"/></filter>
<clipPath id="canvas"><rect x="${X}" y="${Y}" width="${S}" height="${S}"/></clipPath>
</defs>
<rect width="1600" height="1000" fill="#14110e"/>
<rect class="light" width="1600" height="1000" fill="url(#pool)"/>
<g class="hung">
<rect x="${X - 34}" y="${Y - 14}" width="${S + 68}" height="${S + 68}" fill="#000" opacity=".55" filter="url(#shadow)"/>
<rect x="${X - 36}" y="${Y - 36}" width="${S + 72}" height="${S + 72}" fill="#211b16" stroke="#85786b" stroke-width="2"/>
<image href="${PAINTING}" x="${X}" y="${Y}" width="${S}" height="${S}" preserveAspectRatio="xMidYMid slice"/>
<g clip-path="url(#canvas)">
${dapple(0.3, 0.62, 170, 46, 'drift-a', 0)}${dapple(0.7, 0.78, 210, 52, 'drift-b', -12)}${dapple(0.55, 0.3, 150, 38, 'drift-a', -20)}
</g>
</g>
</svg>`
