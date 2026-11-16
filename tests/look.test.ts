import { expect, test } from 'claude-code/testing'

import { problems } from '../hooks/look'
import { checkColors } from '../hooks/make-colors.js'
import { SCENE } from '../hooks/scene'

test('the scene fits the backdrop limit and runs no script', () => {
  expect(SCENE.length).toBeLessThan(131072)
  expect(SCENE.includes('<script')).toBe(false)
  // The water fills any box; the three corner groups pin to the screen's corners.
  expect(SCENE.includes('preserveAspectRatio="xMidYMid slice"')).toBe(true)
  for (const corner of ['xMinYMin meet', 'xMaxYMin meet', 'xMinYMax meet']) expect(SCENE.includes(corner)).toBe(true)
})

test('Desktop paints the colors, and every key is a design-system name', async ($, on) => {
  let sent: unknown
  on('theme.set', (_, e) => {
    sent = e
    return { value: { isDrawn: true as const, requestId: 'test' } }
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const look = sent as { colors: Parameters<typeof checkColors>[0]; backdrop: { scene: string } }
  expect(look.backdrop.scene).toBe('pond')
  // Contrast notes under the design system's own bar still paint (look.md); only a wrong name or mode paints nothing.
  const unpaintable = checkColors(look.colors).filter(line => /paints nothing|isn't a mode|is not a number|won't paint/.test(line))
  expect(unpaintable).toEqual([])
})

test('no contrast line stops Desktop from painting', () => {
  expect(problems.filter(p => p.startsWith("Desktop won't paint"))).toEqual([])
})
