import type { Register } from 'claude-code'

import { LOOK, problems } from './look'
import { SCENE } from './scene'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(`Lily Pond: ${unpainted}`)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(`Lily Pond: ${set.reason}`)
    }
    await $.command.register({ name: 'plain-pond', description: "Take the Lily Pond look off and return to the app's own" })

    return next(e)
  })

  // Only when the person asks: clear() removes any mod's theme, not just this one.
  on('command.run', { command: 'plain-pond' }, async $ => {
    await $.theme.clear()
    return { text: "Lily Pond is off: the app's own look is back. Start a new session to bring the pond back." }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    // This hook runs for every mod's backdrop: draw only our own scene, and only where scenes draw.
    if (e.props.plugin !== $.plugin.name || e.props.scene !== 'pond') {
      return next(e)
    }
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="John La Farge's watercolor Water Lily in Sunlight, slowly drifting, with light moving across the pond" isInteractive />
  })
}
