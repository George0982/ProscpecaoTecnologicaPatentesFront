import AxiosBaseMixin from './base.js'

export default {
    mixins: [AxiosBaseMixin],

    props: {
        manualSubmit: {
            type: Boolean
        }
    },

    mounted () {
        if (!this.manualSubmit) {
            this.submit()
        }
    },

    methods: {
        async submit () {
            this.loading = true
            let response

            try {
                response = await this.$axios.get(
                    this.url,
                    {
                        headers: { 'Cache-Control': 'no-cache' },
                        responseType: 'blob',
                        params: this.variables
                    }
                )

                this.response = response
                this.data = response && response.data
                this.loading = false

                this.$emit('done', response)
            } catch (error) {
                this.error = error.response.data

                this.checkForbidden(error.response)

                this.loading = false

                this.$emit('error', error.response.data)
            }
        }
    }
}
