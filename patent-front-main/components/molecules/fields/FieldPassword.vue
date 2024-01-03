<script>
import {
    ValidationProvider
} from 'vee-validate'
import FieldMixin from '~/mixins/vuetify/fields.js'

export default {
    name: 'FieldPassword',

    components: {
        ValidationProvider
    },

    mixins: [FieldMixin],

    data () {
        return {
            showPass: false
        }
    },

    computed: {
        attrsField () {
            return {
                ...this.$attrs,
                autocomplete: this.$attrs.autocomplete || 'password'
            }
        },

        propsField () {
            return {
                ...this.$props,
                appendIcon: this.showPass ? 'mdi-eye' : 'mdi-eye-off',
                prependInnerIcon: 'mdi-key-outline',
                type: this.showPass ? 'text' : 'password'
            }
        },

        propsValidation () {
            return {
                ...this.validationProps
            }
        }
    }
}
</script>

<template lang="pug">
validation-provider(
    v-bind="propsValidation"
    v-slot="{ errors }"
)
    v-text-field(
        v-bind="propsField"
        v-on="$listeners"
        :attrs="attrsField"
        :error-messages="errors"
        @click:append="(v) => showPass = !showPass"
    )

</template>
