<script>
import {
    ValidationObserver,
    ValidationProvider
} from 'vee-validate'

import FieldText from '@/components/molecules/fields/FieldText.vue'

import gql from 'graphql-tag'

const initData = {
    cnpj: ''
}

export default {
    name: 'FormCnpj',

    components: {
        FieldText,
        ValidationObserver,
        ValidationProvider
    },

    data () {
        return {
            formData: Object.assign({}, initData)
        }
    },

    methods: {
        submit () {
            this.$apollo.query({
                query: gql`
                query(
                    $ni: String!
                ) {
                    companySerpro(
                        ni: $ni
                    ) {
                        ni
                        cnaePrincipal {
                        codigo
                        descricao
                        }
                        tipoEstabelecimento
                        nomeEmpresarial
                        nomeFantasia
                        correioEletronico
                        capitalSocial
                        porte
                        situacaoEspecial
                        dataSituacaoEspecial
                        dataAbertura
                    }
                }
                `,
                variables: {
                    ni: this.formData.cnpj
                }
            })
                .then(data => {
                    this.__onDone(data)
                })
                .catch((error) => {
                    this.__onError(error.graphQLErrors)
                })
        },

        __onDone ({ data }) {
            this.$emit('done', data)
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
                div(class="subtitle-2 font-weight-bold")
                    | CNPJ

                //- Input cnpj
                field-text(
                    dense
                    outlined
                    rounded
                    class="col-12"
                    placeholder="CNPJ"
                    v-model="formData.cnpj"
                    validation-name="cnpj"
                    validation-rules="required"
                    v-mask="'##.###.###/####-##'"
                )

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
                        | Buscar

</template>
