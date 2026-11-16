import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Green-gray paper by day; a lamp-lit pond at night, a second version of the idea, not an inversion.
export const { theme, problems } = makeColors({
  label: 'Lily Pond',
  roles: { accent: '#3f7f6b', danger: '#b8443a', success: '#5a8a3c', warning: '#b7862a', pro: '#7a5c9e' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e8ece2',
        'surface-1': '#eff2ea',
        'surface-2': '#f6f8f2',
        'text-primary': '#1c2520',
        'text-secondary': '#3b4840',
        'text-muted': '#56635a',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#111814',
        'surface-1': '#17201b',
        'surface-2': '#1d2722',
        'surface-3': '#222d27',
        'text-primary': '#e8eee5',
        'text-secondary': '#c3cec3',
        'text-muted': '#9eab9f',
      },
    },
  },
})

export const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'pond', glass: { blur: 18, opacity: 0.72 } },
}
