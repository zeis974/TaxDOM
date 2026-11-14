import { defineConfig } from "@pandacss/dev"

import { baseConfig } from "@taxdom/ui/preset"

export default defineConfig({
  ...baseConfig,
  globalCss: {
    // macOS rubber-band: suppressed on pointer devices, kept on touch (native bounce / pull-to-refresh)
    "html, body": {
      "@media (hover: hover) and (pointer: fine)": {
        overscrollBehaviorY: "none",
      },
    },
    // Keeps elements focused near the bottom from scrolling under the floating mobile tab bar
    html: {
      _touch: {
        scrollPaddingBottom: "calc({spacing.xl} * 3)",
      },
    },
    body: {
      backgroundColor: "{colors.background}",
      // Keeps the end of the page clear of the floating mobile tab bar
      _touch: {
        paddingBottom: "calc({spacing.xl} * 3)",
      },
    },
    // Freezes the page behind modal dialogs such as the mobile tools sheet
    "html:has(dialog:modal)": {
      overflow: "hidden",
    },
  },
})
