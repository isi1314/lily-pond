import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Glowster's Gallery Issue colors: warm paper by day, night ink by night, one vermilion accent.
export const { theme, problems } = makeColors({
  label: 'Lily Pond',
  roles: { accent: '#d4502a', danger: '#c0322a', success: '#5f8a4a', warning: '#c08a24', pro: '#7a5aa3' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#ece5d8',
        'surface-1': '#f2ece1',
        'surface-2': '#f7f2e9',
        'text-primary': '#1b1916',
        'text-secondary': '#3f3933',
        'text-muted': '#5d564d',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#14110e',
        'surface-1': '#1b1713',
        'surface-2': '#211b16',
        'surface-3': '#262019',
        'text-primary': '#f5efe6',
        'text-secondary': '#d8cec0',
        'text-muted': '#b9ad9e',
      },
    },
  },
})

export const LOOK: ThemeSetArgs = {
  colors: theme,
  // A moving scene (hooks/scene.ts): the painting hung on night ink, with light and ripples.
  // Ink- or paper-tinted frost over it so the words stay first.
  backdrop: { scene: 'pond', glass: { blur: 22, opacity: 0.78 } },
}
