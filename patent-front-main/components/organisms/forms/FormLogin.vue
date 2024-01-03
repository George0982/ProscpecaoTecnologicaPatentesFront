<script>
import {
    ValidationObserver,
    ValidationProvider
} from 'vee-validate'

import FieldEmail from '@/components/molecules/fields/FieldEmail.vue'
import FieldPassword from '@/components/molecules/fields/FieldPassword.vue'

import gql from 'graphql-tag'

const initDataLogin = {
    email: '',
    password: ''
}

export default {
    name: 'FormLogin',

    components: {
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
                ) {
                    login(
                        email: $email
                        password: $password
                    ) {
                        email
                        firstName
                        token
                        company
                        diagnostico
                    }
                }
                `,
                variables: {
                    email: this.formData.email,
                    password: this.formData.password
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
            const auth = data.login.token

            await this.$apolloHelpers.onLogin(auth, this.$apolloProvider.clients.customer)

            this.$store.commit('user/setAuth', auth)
            this.$store.commit('company/setCompany', data.login.company)
            this.$store.commit('diagnostico/setDiagnostico', data.login.diagnostico)

            if (data.login.company) {
                this.$router.push('/lista')
            } else {
                this.$router.push('/passos')
            }
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

                //- v-col(
                //-     cols="12"
                //-     class="text-right mt-n7"
                //- )
                //-     v-btn(
                //-         dense
                //-         small
                //-         text
                //-         class="text-none body-2 px-0 grey--text"
                //-     )
                //-         | Esqueceu sua senha?

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
                        | Login

</template>
