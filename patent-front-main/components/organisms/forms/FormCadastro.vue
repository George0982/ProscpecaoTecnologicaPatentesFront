<script>
import {
    ValidationObserver,
    ValidationProvider
} from 'vee-validate'

import FieldText from '@/components/molecules/fields/FieldText.vue'
import FieldEmail from '@/components/molecules/fields/FieldEmail.vue'
import FieldPassword from '@/components/molecules/fields/FieldPassword.vue'

import gql from 'graphql-tag'

const initDataLogin = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
}

export default {
    name: 'FormCadastro',

    components: {
        FieldText,
        FieldEmail,
        FieldPassword,
        ValidationObserver,
        ValidationProvider
    },

    data () {
        return {
            formData: Object.assign({}, initDataLogin)
        }
    },

    methods: {
        submit () {
            this.$apollo.mutate({
                mutation: gql`
                mutation(
                    $email: String!
                    $password: String!
                    $firstName: String!
                    $lastName: String!
                    $phone: String!
                ) {
                    signup(
                        email: $email
                        password: $password
                        firstName: $firstName
                        lastName: $lastName
                        phone: $phone
                    )
                }
                `,
                variables: {
                    email: this.formData.email,
                    password: this.formData.password,
                    firstName: this.formData.firstName,
                    lastName: this.formData.lastName,
                    phone: this.formData.phone
                }
            })
                .then(data => {
                    this.__onDone(data)
                })
                .catch((error) => {
                    this.__onError(error.graphQLErrors)
                })
        },

        async __onDone ({ data }) {
            const auth = data.signup

            await this.$apolloHelpers.onLogin(auth, this.$apolloProvider.clients.customer)

            this.$store.commit('user/setAuth', auth)

            this.$router.push('/passos')
        },

        __onError (err) {
            this.$toast.error(err[0].message, {
                icon: 'mdi-alert-circle-outline'
            })
        }
    }

}
</script>

<template lang="pug">
    validation-observer(
        slim
        v-slot="{ handleSubmit }"
    )
        form(@submit.prevent="handleSubmit(submit)")
            v-row

                //- Input email
                field-email(
                    dense
                    outlined
                    rounded
                    class="col-12"
                    placeholder="Email"
                    v-model="formData.email"
                    validation-name="email"
                    validation-rules="required|email"
                )

                //- Input password
                field-password(
                    dense
                    outlined
                    rounded
                    class="col-12 py-0"
                    placeholder="Password"
                    v-model="formData.password"
                    validation-name="password"
                    validation-rules="required"
                )

                field-text(
                    dense
                    outlined
                    rounded
                    autocomplete="given-name"
                    class="col-12"
                    placeholder="Primeiro nome"
                    v-model="formData.firstName"
                    validation-name="fistName"
                    validation-rules="required"
                )

                field-text(
                    dense
                    outlined
                    rounded
                    autocomplete="family-name"
                    class="col-12"
                    placeholder="Sobrenome"
                    v-model="formData.lastName"
                    validation-name="lastName"
                    validation-rules="required"
                )

                field-text(
                    dense
                    outlined
                    rounded
                    autocomplete="tel"
                    class="col-12"
                    placeholder="Telefone"
                    v-model="formData.phone"
                    validation-name="phone"
                    validation-rules="required"
                    v-mask="formData.phone.length < 15 ? '(##) ####-####!' : '(##) # ####-####'"
                )

                v-col
                    v-divider(height="10")

                v-col(
                    cols="12"
                    class="px-0"
                )

                    //- Botão Login
                    v-btn(
                        block
                        depressed
                        large
                        rounded
                        class="text-none font-weight-bold"
                        color="primary"
                        type="submit"
                    )
                        | Cadastre-se

                v-col(
                    cols="12"
                    class="pa-0"
                )

                    //- Botão Login
                    v-btn(
                        outlined
                        block
                        depressed
                        large
                        rounded
                        class="text-none font-weight-bold"
                        color="green"
                        @click="$router.push('/')"
                    )
                        | Login

</template>
