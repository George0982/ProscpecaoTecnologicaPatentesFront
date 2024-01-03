require('dotenv').config()

export default {

    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - ',
        title: 'Patente',
        htmlAttrs: {
            lang: 'pt-br'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            {
                rel: 'icon', type: 'image/x-icon', href: '/favicon.png'
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/css/app.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/vue-the-mask',
        '~/plugins/apexcharts',
        '~/plugins/vuetify/vuetify-option.js',
        '~/plugins/vee-validate',
        '~/plugins/persistedState.client'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify'
    ],

    router: {
        mode: 'history',
        prefetchLinks: true,
        routeNameSplitter: '/'
    },

    vuetify: {
        customVariables: ['~/assets/css/variables.scss'],
        treeShake: true
    },

    loading: {
        color: '#2699FB',
        height: '3px',
        thorttle: 100
    },

    apollo: {
        clientConfigs: {
            default: {
                // required
                // httpEndpoint: 'http://localhost:8081'
                httpEndpoint: 'https://patente-search.herokuapp.com'
            }
        }
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        'vue-currency-input/nuxt',
        'vue-sweetalert2/nuxt',
        '@nuxtjs/toast',
        '@nuxtjs/apollo'
    ],

    toast: {
        iconPack: 'mdi',
        duration: 8000,
        position: 'top-center',
        register: [ // Register custom toasts
        ]
    },

    /**
     * @nuxt/moment
     * https://github.com/nuxt-community/moment-module
     */
    moment: {
        defaultLocale: 'pt-br',
        locales: ['pt-br']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    generate: {
        fallback: true
    }
}
