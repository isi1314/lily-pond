import { expect, test } from 'claude-code/testing'

import { LOOK, problems } from '../hooks/look'
import { checkColors } from '../hooks/make-colors.js'

test('the backdrop is the painting file, within the still-image limits', () => {
  expect(LOOK.backdrop).toEqual({ image: { source: 'assets/painting.jpg' } })
})

test('Desktop paints the colors, and every key is a design-system name', async ($, on) => {
  let sent: unknown
  on('theme.set', (_, e) => {
    sent = e
    return { value: { isDrawn: true as const, requestId: 'test' } }
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const look = sent as { colors: Parameters<typeof checkColors>[0]; backdrop: { image: { source: string } } }
  expect(look.backdrop.image.source).toBe('assets/painting.jpg')
  // Contrast notes under the design system's own bar still paint (look.md); only a wrong name or mode paints nothing.
  const unpaintable = checkColors(look.colors).filter(line => /paints nothing|isn't a mode|is not a number|won't paint/.test(line))
  expect(unpaintable).toEqual([])
})

test('no contrast line stops Desktop from painting', () => {
  expect(problems.filter(p => p.startsWith("Desktop won't paint"))).toEqual([])
})

test('/plain-pond takes the look off', async ($, on) => {
  let cleared = false
  on('theme.set', () => ({ value: { isDrawn: true as const, requestId: 't' } }))
  on('theme.clear', () => {
    cleared = true
    return { value: { isDrawn: true as const, requestId: 't' } }
  })
  on('command.register', () => ({ value: { command: 'plain-pond' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('command.run', () => ({ text: '' }))
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const result = await $.command.run({ command: 'plain-pond', args: '', origin: { kind: 'composer' }, presentation: { isFullscreen: false, columns: 80 } })
  expect(cleared).toBe(true)
  expect(result.text).toContain('Lily Pond is off')
})
