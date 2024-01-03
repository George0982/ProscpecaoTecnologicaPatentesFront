<script>
import {
    ValidationProvider
} from 'vee-validate'
import FieldMixin from '~/mixins/vuetify/fields.js'

export default {
    name: 'FieldText',

    components: {
        ValidationProvider
    },

    mixins: [FieldMixin],

    computed: {
        attrsField () {
            return {
                ...this.$attrs

            }
        },

        propsField () {
            return {
                ...this.$props
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
    )

</template>
