import Typography from "typography"
import grandViewTheme from "typography-theme-grand-view"

grandViewTheme.baseLineHeight = 1.7
grandViewTheme.overrideThemeStyles = () => ({
  a: {
    color: "#2e7d32",
  },
})

const typography = new Typography(grandViewTheme)

if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
