import { PAINTING } from './painting'

// The pond is Glowster's own painting: La Farge's water lily, hung in the app's night ink with a
// museum vignette. A slow push-in moves across it, bands of sunlight cross the water and a few
// ripples spread from the lily. CSS motion only, slow, and still under prefers-reduced-motion.

const ripple = (x: number, y: number, delay: number) =>
  `<circle class="ripple" style="animation-delay:${delay}s" cx="${x}" cy="${y}" r="46" fill="none" stroke="#f7f2e9" stroke-width="1.6"/>`

const band = (y: number, h: number, delay: number) =>
  `<rect class="sun" style="animation-delay:${delay}s" x="-200" y="${y}" width="1200" height="${h}" fill="url(#sun)"/>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<style>
.push{animation:push 90s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:45% 40%}
.sun{animation:sun 26s ease-in-out infinite alternate;opacity:.0}
.ripple{animation:ripple 11s ease-out infinite;opacity:0;transform-box:fill-box;transform-origin:center}
@keyframes push{from{transform:scale(1.04) translate(0,0)}to{transform:scale(1.13) translate(-14px,-9px)}}
@keyframes sun{0%{opacity:0;transform:translate(-60px,0) skewX(-18deg)}50%{opacity:.5}100%{opacity:0;transform:translate(90px,0) skewX(-18deg)}}
@keyframes ripple{0%{transform:scale(.25);opacity:.5}100%{transform:scale(2.4);opacity:0}}
@media (prefers-reduced-motion:reduce){.push,.sun,.ripple{animation:none}.push{transform:scale(1.06)}.sun,.ripple{opacity:0}}
</style>
<defs>
<linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#fff6dc" stop-opacity="0"/><stop offset=".5" stop-color="#fff6dc" stop-opacity=".22"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/>
</linearGradient>
<radialGradient id="vignette" cx=".46" cy=".42" r=".75">
<stop offset=".45" stop-color="#14110e" stop-opacity="0"/><stop offset="1" stop-color="#14110e" stop-opacity=".62"/>
</radialGradient>
</defs>
<rect width="100%" height="100%" fill="#14110e"/>
<svg viewBox="0 0 800 802" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
<g class="push"><image href="${PAINTING}" width="800" height="802" preserveAspectRatio="xMidYMid slice"/></g>
${band(180, 90, 0)}${band(470, 120, 9)}${band(640, 70, 17)}
${ripple(372, 330, 0)}${ripple(300, 380, 4)}${ripple(450, 300, 8)}
<rect width="800" height="802" fill="url(#vignette)"/>
</svg>
</svg>`
