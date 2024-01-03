import { slotScope } from '@/helpers'

export default {

    props: {
        variables: {
            type: Object,
            default: undefined
        }
    },

    data () {
        return {
            token: undefined,
            mapa: undefined,
            data: undefined,
            error: undefined,
            loading: false,
            response: undefined,
            url: undefined
        }
    },

    watch: {
        loading (value) {
            this.$emit('loading', value)
        }
    },

    methods: {
        checkForbidden ({ status }) {
            if (parseInt(status) === 403) {
                this.$router.push('/forbidden')
            }
        }
    },

    render (h) {
        const props = {
            data: this.data,
            error: this.error,
            loading: this.loading,
            response: this.response,
            submit: this.submit
        }

        // - Adicionando Token e mapa no Header
        if (this.$store.state.user.user) {
            const mapa = JSON.stringify({ ...this.$store.state.user.user.mapa[0] })

            this.$axios.defaults.headers = {
                ...this.$axios.defaults.headers,
                token: this.$store.state.user.auth,
                mapa
            }
        }

        const slotScoped = slotScope(this, 'default', props, this.$slots.default)

        return this.tag ? h(this.tag, slotScoped) : h('div', slotScoped)
    }
}
