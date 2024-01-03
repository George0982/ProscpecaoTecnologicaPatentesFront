import { VSelect } from 'vuetify/lib'
import ValidationMixin from '@/mixins/validation.js'

export default {
    mixins: [ValidationMixin],

    props: VSelect.options.props
}
