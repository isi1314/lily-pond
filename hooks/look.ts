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
  // The painting hung on a night-ink wall at just below its native size, baked into one 3840 by 2400
  // picture: stretched full-bleed, the 2553 px scan read as a low-resolution photo. John La Farge, Water Lily in Sunlight, ca. 1883,
  // Smithsonian American Art Museum, Gift of John Gellatly, 1929.6.70, CC0.
  backdrop: { image: { source: 'assets/painting.jpg' } },
}
