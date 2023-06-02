import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'

const musionThemeDark = {
  dark: true,
  colors: {
    primary: '#FF4081',
    secondary: '#1A1A1A',
    tertary: '#AEAEAE',
    acent: '#212120'
  }
}

const theme = {
  defaultTheme: 'musionThemeDark',
  themes: {
    musionThemeDark
  }
}

const icons = {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi,
    fa
  }
}

export const vuetify = createVuetify({
  components,
  directives,
  theme,
  icons
})
