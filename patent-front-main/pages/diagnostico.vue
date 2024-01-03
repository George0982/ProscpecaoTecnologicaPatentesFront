<script>
import ListDiagnosticos from '@/components/api/ListDiagnosticos.vue'
import FormCompany from '@/components/organisms/forms/FormCompany.vue'
import Company from '@/components/api/Company.vue'

import gql from 'graphql-tag'

export default {

    name: 'PageDiagnosticos',

    components: {
        ListDiagnosticos,
        FormCompany,
        Company
    },

    layout: 'auth',

    middleware: 'authenticated',

    data () {
        return {
            formData: {
                oferta: null,
                plataforma: null,
                capturaValor: null,
                cadeiaSuprimentos: null
            }
        }
    },

    methods: {
        total (name) {
            const list = this.formData[name].diagnosticoItem

            const val = 100 / list.length
            const valuePositivos = list.filter(el => el.value)
            const total = val * valuePositivos.length

            this.formData[name].total = parseInt(total.toFixed(0))

            return parseInt(total.toFixed(0))
        },

        __onDoneSave (data) {
            this.$router.push('/lista')
        },

        __onError (err) {
            err && this.$toast.error(err[0].message, {
                icon: 'mdi-alert-circle-outline'
            })
        },

        __onDone (data) {
            this.formData.oferta = {
                diagnosticoItem: data.oferta.map(el => {
                    return {
                        description: el,
                        value: false
                    }
                }),
                total: 0
            }

            this.formData.plataforma = {
                diagnosticoItem: data.plataforma.map(el => {
                    return {
                        description: el,
                        value: false
                    }
                }),
                total: 0
            }

            this.formData.capturaValor = {
                diagnosticoItem: data.capturaValor.map(el => {
                    return {
                        description: el,
                        value: false
                    }
                }),
                total: 0
            }

            this.formData.cadeiaSuprimentos = {
                diagnosticoItem: data.cadeiaSuprimentos.map(el => {
                    return {
                        description: el,
                        value: false
                    }
                }),
                total: 0
            }
        },

        onSubmit () {
            this.$apollo.mutate({
                mutation: gql`
                mutation(
                    $oferta: OfertaInput
                    $plataforma: PlataformaInput
                    $capturaValor: capturaValorInput
                    $cadeiaSuprimentos: cadeiaSuprimentosInput
                ) {
                    createDiagnostico(
                        oferta: $oferta
                        plataforma: $plataforma
                        capturaValor: $capturaValor
                        cadeiaSuprimentos: $cadeiaSuprimentos
                    ) {
                        oferta {
                            diagnosticoItem {
                                description
                                value
                            }
                            total
                        }
                        plataforma {
                            diagnosticoItem {
                                description
                                value
                            }
                            total
                        }
                        capturaValor {
                            diagnosticoItem {
                                description
                                value
                            }
                            total
                        }
                        cadeiaSuprimentos {
                            diagnosticoItem {
                                description
                                value
                            }
                            total
                        }
                    }
                }
                `,
                variables: {
                    ...this.formData
                }
            })
                .then(data => {
                    this.__onDoneSave(data)
                })
                .catch((error) => {
                    this.__onError(error.graphQLErrors)
                })
        }
    }
}
</script>

<template lang="pug">
    ListDiagnosticos(
        ref="listDiagnosticos"
        v-slot="{ loading, query }"
        @done="__onDone"
    )
        v-row(
            class="full-height full-width ma-0 mt-10"
            justify="center"
        )
            v-col(
                cols="12"
                md="10"
                sm="10"
            )

                v-card(
                    class="row pa-8"
                    style="box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;"
                )

                    v-col(
                        cols="12"
                        class="font-weight-bold text-h6 pa-0 pb-3"
                    )
                        | Diagnóstico da Inovação

                    v-col(
                        cols="12"
                        class="pa-0 pb-3 mt-5"
                        v-if="formData.oferta && formData.oferta.diagnosticoItem"
                    )
                        div(class="font-weight-bold mb-2")
                            | Oferta

                        div(
                            class="row align-content-center"
                            v-for="(item, index) in formData.oferta.diagnosticoItem"
                            :key="`oferta-${index}`"
                        )
                            div(class="col-auto")
                                | {{ item.description }}

                            div(class="col-auto")
                                v-switch(
                                    hide-details
                                    class="pa-0 ma-0"
                                    v-model="item.value"
                                    :label="item.value ? `sim` : `não`"
                                )

                        div(class="font-weight-bold mt-2")
                            | Total:
                            | {{ total('oferta') }}%

                    v-divider

                    v-col(
                        cols="12"
                        class="pa-0 pb-3  mt-4"
                        v-if="formData.plataforma && formData.plataforma.diagnosticoItem"
                    )
                        div(class="font-weight-bold mb-2")
                            | Plataforma

                        div(
                            class="row align-content-center"
                            v-for="(item, index) in formData.plataforma.diagnosticoItem"
                            :key="`plataforma-${index}`"
                        )
                            div(class="col-auto")
                                | {{ item.description }}

                            div(class="col-auto")
                                v-switch(
                                    hide-details
                                    class="pa-0 ma-0"
                                    v-model="item.value"
                                    :label="item.value ? `sim` : `não`"
                                )

                        div(class="font-weight-bold mt-2")
                            | Total:
                            | {{ total('plataforma') }}%

                    v-divider

                    v-col(
                        cols="12"
                        class="pa-0 pb-3 mt-4"
                        v-if="formData.capturaValor && formData.capturaValor.diagnosticoItem"
                    )
                        div(class="font-weight-bold mb-2")
                            | Captura de Valor

                        div(
                            class="row align-content-center"
                            v-for="(item, index) in formData.capturaValor.diagnosticoItem"
                            :key="`capturaValor-${index}`"
                        )
                            div(class="col-auto")
                                | {{ item.description }}

                            div(class="col-auto")
                                v-switch(
                                    hide-details
                                    class="pa-0 ma-0"
                                    v-model="item.value"
                                    :label="item.value ? `sim` : `não`"
                                )

                        div(class="font-weight-bold mt-2")
                            | Total:
                            | {{ total('capturaValor') }}%

                    v-divider

                    v-col(
                        cols="12"
                        class="pa-0 pb-3 mt-4"
                        v-if="formData.cadeiaSuprimentos && formData.cadeiaSuprimentos.diagnosticoItem"
                    )
                        div(class="font-weight-bold mb-2")
                            | Cadeia de Suprimentos

                        div(
                            class="row align-content-center"
                            v-for="(item, index) in formData.cadeiaSuprimentos.diagnosticoItem"
                            :key="`cadeiaSuprimentos-${index}`"
                        )
                            div(class="col-auto")
                                | {{ item.description }}

                            div(class="col-auto")
                                v-switch(
                                    hide-details
                                    class="pa-0 ma-0"
                                    v-model="item.value"
                                    :label="item.value ? `sim` : `não`"
                                )

                        div(class="font-weight-bold mt-2")
                            | Total:
                            | {{ total('cadeiaSuprimentos') }}%

                    div(class="col-12")
                        div(class="row justify-end")
                            v-btn(
                                outlined
                                depressed
                                large
                                rounded
                                class="text-none font-weight-bold"
                                color="green"
                                @click="onSubmit"
                            )
                                | Salvar e continuar

</template>
