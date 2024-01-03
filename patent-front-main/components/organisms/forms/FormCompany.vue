<script>
import {
    ValidationObserver,
    ValidationProvider
} from 'vee-validate'

import FieldText from '@/components/molecules/fields/FieldText.vue'

import gql from 'graphql-tag'

const initDataLogin = {
    ni: null,
    cnaePrincipal: {
        codigo: null,
        descricao: null
    },
    tipoEstabelecimento: null,
    nomeEmpresarial: null,
    nomeFantasia: null,
    correioEletronico: null,
    capitalSocial: null,
    porte: null,
    situacaoEspecial: null,
    dataSituacaoEspecial: null,
    dataAbertura: null
}

export default {
    name: 'FormCompany',

    components: {
        FieldText,
        ValidationObserver,
        ValidationProvider
    },

    props: {
        company: {
            type: Object,
            required: true
        }
    },

    data () {
        return {
            price: null,
            formData: Object.assign({}, initDataLogin)
        }
    },

    computed: {
        options () {
            return {
                currency: 'BRL',
                locale: 'pt-BR',
                precision: 2,
                autoDecimalMode: true,
                distractionFree: false
            }
        }
    },

    watch: {
        company: {
            immediate: true,
            handler (val) {
                const tamanho = val.capitalSocial.toString().length - 2
                const teste = val.capitalSocial.toString().slice(0, tamanho)
                const teste1 = teste.slice(-2)

                this.formData = val

                this.price = `${teste},${teste1}`
            }
        }
    },

    methods: {
        submit () {
            this.$apollo.mutate({
                mutation: gql`
                mutation(
                    $ni: String!
                    $cnaePrincipal: CnaePrincipalInput
                    $tipoEstabelecimento: String
                    $nomeEmpresarial: String
                    $nomeFantasia: String
                    $correioEletronico: String
                    $capitalSocial: String
                    $porte: String
                    $situacaoEspecial: String
                    $dataSituacaoEspecial: String
                    $dataAbertura: String
                ) {
                    createCompany(
                        ni: $ni
                        cnaePrincipal: $cnaePrincipal
                        tipoEstabelecimento: $tipoEstabelecimento
                        nomeEmpresarial: $nomeEmpresarial
                        nomeFantasia: $nomeFantasia
                        correioEletronico: $correioEletronico
                        capitalSocial: $capitalSocial
                        porte: $porte
                        situacaoEspecial: $situacaoEspecial
                        dataSituacaoEspecial: $dataSituacaoEspecial
                        dataAbertura: $dataAbertura
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
                    ni: this.formData.ni,
                    cnaePrincipal: {
                        codigo: this.formData.cnaePrincipal.codigo,
                        descricao: this.formData.cnaePrincipal.descricao
                    },
                    tipoEstabelecimento: this.formData.tipoEstabelecimento,
                    nomeEmpresarial: this.formData.nomeEmpresarial,
                    nomeFantasia: this.formData.nomeFantasia,
                    correioEletronico: this.formData.correioEletronico,
                    capitalSocial: this.formData.capitalSocial,
                    porte: this.formData.porte,
                    situacaoEspecial: this.formData.situacaoEspecial,
                    dataSituacaoEspecial: this.formData.dataSituacaoEspecial,
                    dataAbertura: this.formData.dataAbertura
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
            this.$store.commit('company/setCompany', true)
            this.$router.push('/diagnostico')
        },

        __onError (err) {
            this.$toast.error(err[0].message, {
                icon: 'mdi-alert-circle-outline'
            })
        },

        __onInputPrice (value) {
            this.formData.capitalSocial = value.replace('R$', '').replace(/\s/g, '')
        },

        __onChangePrice (value) {
            this.formData.capitalSocial = value.replace('R$', '').replace(/\s/g, '')
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

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | NI

                    field-text(
                        disabled
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="CNPJ"
                        v-model="formData.ni"
                        validation-name="ni"
                        validation-rules="required"
                    )

                v-col(
                    class="py-0 mb-1 font-weight-bold"
                    cols="12"
                )
                    | Cnae Principal

                v-col(
                    class="py-0"
                    cols="6"
                )

                    | Cnae codigo
                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="CNPJ"
                        v-model="formData.cnaePrincipal.codigo"
                        validation-name="codigo"
                    )

                v-col(
                    class="py-0"
                    cols="6"
                )
                    | Cnae descricao
                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Cnae Principal"
                        v-model="formData.cnaePrincipal.descricao"
                        validation-name="descricao"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Codigo

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Codigo"
                        v-model="formData.codigo"
                        validation-name="codigo"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Descricao

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Descricao"
                        v-model="formData.descricao"
                        validation-name="descricao"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )

                    div(class="font-weight-bold")
                        | Tipo Estabelecimento

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Tipo Estabelecimento"
                        v-model="formData.tipoEstabelecimento"
                        validation-name="tipoEstabelecimento"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Nome Empresarial

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Nome Empresarial"
                        v-model="formData.nomeEmpresarial"
                        validation-name="nomeEmpresarial"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Nome Fantasia

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Nome Fantasia"
                        v-model="formData.nomeFantasia"
                        validation-name="nomeFantasia"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Correio Eletronico

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Correio Eletronico"
                        v-model="formData.correioEletronico"
                        validation-name="correioEletronico"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Capital Social

                    field-text(
                        ref="input"
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Capital Social"
                        v-currency="options"
                        validation-name="capitalSocial"
                        v-model="price"
                        @change="__onChangePrice"
                        @input="__onInputPrice"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Porte

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Porte"
                        v-model="formData.porte"
                        validation-name="porte"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Situacao Especial

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Situacao Especial"
                        v-model="formData.situacaoEspecial"
                        validation-name="situacaoEspecial"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Data da Situacao Especial

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Data da Situacao Especial"
                        v-model="formData.dataSituacaoEspecial"
                        validation-name="dataSituacaoEspecial"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )
                    div(class="font-weight-bold")
                        | Data Abertura

                    field-text(
                        dense
                        outlined
                        rounded
                        class="col-12"
                        placeholder="Data Abertura"
                        v-model="formData.dataAbertura "
                        validation-name="dataAbertura"
                    )

                v-col(
                    class="py-0"
                    cols="12"
                )

                    //- Botão salvar
                    v-btn(
                        block
                        depressed
                        large
                        rounded
                        class="text-none font-weight-bold white--text"
                        color="green"
                        type="submit"
                    )
                        | Salvar e seguir

</template>
