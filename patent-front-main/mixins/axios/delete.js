import Vue from 'vue'

import AxiosBaseMixin from './base.js'

export default Vue.extend({
    mixins: [AxiosBaseMixin],

    methods: {
        async submit () {
            this.loading = true
            let response

            try {
                response = await this.$axios.delete(this.url, { params: this.variables })

                this.response = response
                this.data = response && response.data
                this.loading = false

                this.$emit('done', response)
            } catch (error) {
                this.error = error.response.data
                this.loading = false

                this.$emit('error', error.response.data)
            }
        }
    }
})
