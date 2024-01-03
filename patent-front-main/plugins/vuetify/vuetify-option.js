import Vuetify from 'vuetify'

export default (ctx) => {
    const vuetify = new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: '#409eff',
                    secondary: '#18ce0f',
                    tertiary: '#495057',
                    accent: '#82B1FF'
                }
            }
        }
    })

    ctx.app.vuetify = vuetify
    ctx.$vuetify = vuetify.framework
}
