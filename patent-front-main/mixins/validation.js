import { ValidationProvider } from 'vee-validate'
import {
    PrependObjectKeys,
    UnPrependObjectKeys
} from '@/helpers'

const validationProviderProps = PrependObjectKeys(ValidationProvider.options.props, 'validation-')

export default {
    props: {
        ...validationProviderProps,

        validationName: {
            type: String,
            default: ' '
        },

        validationSlim: {
            type: Boolean,
            default: () => true
        },

        validationVid: {
            type: String,
            default: ''
        }
    },

    computed: {
        validationProps () {
            return UnPrependObjectKeys(this.$props, 'validation-')
        }
    }
}
