// The pond: the root takes the screen's own size; the water is a layer cropped to fill it
// (slice), and three corner groups pin to the real corners with their own preserveAspectRatio,
// so a tall phone and a wide window both keep them in view.
// The middle (the words) and the foot (the message box) stay open water.
// Motion is CSS only, slow, and stops under prefers-reduced-motion.

const PAD = 'M0 0L58.7 -12.5A60 60 0 1 0 58.7 12.5Z'

const pad = (x: number, y: number, s: number, turn: number, fill: string) =>
  `<g transform="translate(${x} ${y}) rotate(${turn}) scale(${s})">` +
  `<path d="${PAD}" fill="${fill}"/>` +
  `<path d="M0 0L52 -9M0 0L40 -38M0 0L0 -56M0 0L-40 -38M0 0L-56 0M0 0L-40 38M0 0L0 56M0 0L40 38M0 0L52 9" stroke="#2f4a3a" stroke-opacity=".28" stroke-width="1.6" fill="none"/>` +
  `</g>`

const petals = (n: number, rx: number, ry: number, fill: string, offset: number) =>
  Array.from({ length: n }, (_, i) =>
    `<ellipse cx="0" cy="${-ry}" rx="${rx}" ry="${ry}" fill="${fill}" transform="rotate(${(360 / n) * i + offset})"/>`,
  ).join('')

const bloom = (x: number, y: number, s: number) =>
  // The breathing animation sits on an inner group: a CSS transform replaces the transform attribute.
  `<g transform="translate(${x} ${y}) scale(${s})"><g class="bloom">` +
  petals(10, 13, 34, '#f3ede1', 0) +
  petals(8, 11, 26, '#fbf7ef', 22) +
  petals(6, 8, 16, '#f6e7c9', 10) +
  `<circle r="10" fill="#e9b949"/><circle r="5" fill="#d79a2b"/>` +
  `</g></g>`

const ripple = (x: number, y: number, delay: number) =>
  `<circle class="ripple" style="animation-delay:${delay}s" cx="${x}" cy="${y}" r="40" fill="none" stroke="#eef3ea" stroke-width="2"/>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<style>
.drift-a{animation:drift-a 46s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
.drift-b{animation:drift-b 58s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
.bloom{animation:breathe 14s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
.ripple{animation:ripple 9s ease-out infinite;opacity:0;transform-box:fill-box;transform-origin:center}
.shimmer{animation:shimmer 22s ease-in-out infinite alternate}
@keyframes drift-a{from{transform:translate(0,0) rotate(0deg)}to{transform:translate(14px,8px) rotate(4deg)}}
@keyframes drift-b{from{transform:translate(0,0) rotate(0deg)}to{transform:translate(-12px,10px) rotate(-5deg)}}
@keyframes breathe{from{transform:scale(1)}to{transform:scale(1.04)}}
@keyframes ripple{0%{transform:scale(.2);opacity:.55}100%{transform:scale(2.6);opacity:0}}
@keyframes shimmer{from{opacity:.35}to{opacity:.7}}
@media (prefers-reduced-motion:reduce){.drift-a,.drift-b,.bloom,.ripple,.shimmer{animation:none}.ripple{opacity:0}}
</style>
<defs>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#8fa99a"/><stop offset=".55" stop-color="#6d8b7c"/><stop offset="1" stop-color="#4c6a5c"/>
</linearGradient>
<radialGradient id="light" cx=".5" cy=".5" r=".5">
<stop offset="0" stop-color="#e8efe0" stop-opacity=".55"/><stop offset="1" stop-color="#e8efe0" stop-opacity="0"/>
</radialGradient>
<radialGradient id="deep" cx=".5" cy=".5" r=".5">
<stop offset="0" stop-color="#2f4a3e" stop-opacity=".45"/><stop offset="1" stop-color="#2f4a3e" stop-opacity="0"/>
</radialGradient>
</defs>
<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
<rect width="1600" height="1000" fill="url(#water)"/>
<g class="shimmer">
<ellipse cx="420" cy="260" rx="520" ry="160" fill="url(#light)"/>
<ellipse cx="1240" cy="640" rx="560" ry="180" fill="url(#light)"/>
</g>
<ellipse cx="900" cy="900" rx="700" ry="220" fill="url(#deep)"/>
<ellipse cx="200" cy="600" rx="380" ry="200" fill="url(#deep)"/>
</svg>
<svg viewBox="0 0 1100 900" preserveAspectRatio="xMinYMin meet" width="100%" height="100%">
<g class="drift-a">${pad(110, 90, 1.5, -20, '#4f7d4a')}${pad(250, 70, 0.9, 140, '#5d8a52')}</g>
<g class="drift-b">${pad(80, 240, 1.0, 60, '#45703f')}</g>
${ripple(300, 200, 0)}
</svg>
<svg viewBox="0 0 1100 900" preserveAspectRatio="xMaxYMin meet" width="100%" height="100%">
<g class="drift-b">${pad(970, 120, 1.7, 200, '#557f47')}${pad(1050, 280, 0.8, 30, '#4a7542')}</g>
${bloom(975, 112, 1.25)}
${ripple(880, 260, 3)}
</svg>
<svg viewBox="0 0 1100 900" preserveAspectRatio="xMinYMax meet" width="100%" height="100%">
<g class="drift-a">${pad(90, 810, 1.3, 100, '#4b7745')}${pad(220, 860, 0.75, -60, '#5a874f')}</g>
${bloom(96, 802, 0.75)}
${ripple(260, 780, 6)}
</svg>
</svg>`
