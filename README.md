# Lily Pond

Glowster's Gallery look for the Claude desktop and mobile apps. Warm paper by day, night ink by night, one vermilion accent, and behind the conversation John La Farge's watercolor *Water Lily in Sunlight* (ca. 1883), drifting slowly while bands of sunlight cross the water and ripples spread from the lily.

![Lily Pond icon](.claude-plugin/icon.png)

## What it does

- **Colors, both modes.** Surfaces, text and accents come from the palette of the [Glowster](https://glowster.app) app: paper and ink with a vermilion accent. Text keeps strong contrast on every surface; red still means danger, green success and amber warning.
- **A moving backdrop.** The painting fills the window from a tall phone to a wide screen, with a slow push-in and light moving across the pond. Panels are frosted over it so text stays easy to read.
- **Gentle motion.** Everything moves slowly with CSS only, and stops completely when your system asks for reduced motion.

The terminal and editor extensions draw no themes, so there the mod does nothing.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install lily-pond --marketplace isi1314/lily-pond
```

Answer `y` to add the marketplace, then pick a scope (user is the usual choice).

From a shell:

```
claude plugin install lily-pond --marketplace isi1314/lily-pond
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `isi1314/lily-pond`, then Add plugin.

Start a new session in the Claude desktop or mobile app and the pond appears. To go back to the app's own look for the rest of a session, run `/plain-pond`; to stop it for good, disable or uninstall the plugin.

## The painting

John La Farge, *Water Lily in Sunlight*, ca. 1883, watercolor. Smithsonian American Art Museum, gift of John Gellatly (1929.6.70). Public domain (CC0). An 800 px copy travels inside the theme, so nothing is loaded from the network. No scripts, no data read or sent.

## License

The code is MIT, see [LICENSE](LICENSE). The painting is public domain.
