// Vee Validate
import ptBR from 'vee-validate/dist/locale/pt_BR.json'

import {
    extend,
    localize
} from 'vee-validate'

import {
    email,
    required,
    length
} from 'vee-validate/dist/rules'

extend('email', email)
extend('required', required)
extend('length', length)

localize('pt_BR', ptBR)
