import { VTextField } from 'vuetify/lib'
import ValidationMixin from '@/mixins/validation.js'

export default {
    mixins: [ValidationMixin],

    props: VTextField.options.props
}
