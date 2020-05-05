import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"
import stAnnesTheme from "typography-theme-st-annes"

stAnnesTheme.baseFontSize = `20px`

const typography = new Typography(stAnnesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
