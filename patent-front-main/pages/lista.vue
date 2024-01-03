<script>
import ListPatentOps from '@/components/api/ListPatentOps.vue'
import Diagnostico from '@/components/api/Diagnostico.vue'
import Me from '@/components/api/Me.vue'

export default {
    name: 'PageLista',

    components: {
        ListPatentOps,
        Diagnostico,
        Me
    },

    layout: 'auth',

    middleware: 'authenticated',

    data () {
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: [
                        'Oferta',
                        'Plataforma',
                        'Captura de Valor',
                        'Cadeia de Suprimentos'
                    ]
                }
            },
            series: [],
            range: '1-100',
            page: 1,
            total: 0,
            isLoading: false,
            palavrasSelecionadas: [],
            palavras: [],
            show: false,
            listPatentOps: null
        }
    },

    methods: {
        __onDone (data) {
            this.total = data && data.listPatentOps && data.listPatentOps.total ? data.listPatentOps.total : 0
            this.listPatentOps = data && data.listPatentOps && data.listPatentOps.list && data.listPatentOps.list.map((el) => {
                return {
                    ...el,
                    modal: false
                }
            })

            this.isLoading = false
        },

        __onDoneMe (data) {
            this.palavras = data.company.cnaePrincipal.descricao.split(/[\s,]+/)
        },

        __onErrorMe (err) {
            err && this.$toast.error(err[0].message, {
                icon: 'mdi-alert-circle-outline'
            })
        },

        __onInputPage (data, query) {
            const pageSize = 100
            this.range = this.paginate(this.total, data, pageSize)
            this.$refs.listOps.loadMore(query)
            this.isLoading = true
        },

        paginate (
            totalItems = 2000,
            currentPage = 1,
            pageSize = 100
        ) {
            // calculate total pages
            const totalPages = Math.ceil(totalItems / pageSize)

            // ensure current page isn't out of range
            if (currentPage < 1) {
                currentPage = 1
            } else if (currentPage > totalPages) {
                currentPage = totalPages
            }

            // calculate start and end item indexes
            const startIndex = (currentPage - 1) * pageSize
            const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1) + 1

            // return object with all pager properties required by the view
            return `${startIndex + 1}-${endIndex}`
        },

        __onDoneDiagnostico (data) {
            if (data) {
                this.series = []
                this.series.push({
                    name: 'Diagnóstico',
                    data: [
                        data.oferta.total,
                        data.plataforma.total,
                        data.capturaValor.total,
                        data.cadeiaSuprimentos.total
                    ]
                })
            }
        },

        __onErrorDiagnostico (err) {
            this.$toast.error(err[0].message, {
                icon: 'mdi-alert-circle-outline'
            })
        }

    }
}
</script>

<template lang="pug">
ListPatentOps(
    ref="listOps"
    :range="range"
    :q="palavrasSelecionadas"
    v-slot="{ loading, query }"
    @done="__onDone"
)
    Diagnostico(
        ref="diagnostico"
        v-slot="{ loading, query }"
        @done="__onDoneDiagnostico"
        @error="__onErrorDiagnostico"
    )
        v-row(
            align="start"
            class="full-height full-width ma-0 mt-10 px-10"
            justify="center"
        )
            div(class="font-weight-bold mb-3 text-h5")
                | Inovação da sua empresa hoje

            apexchart(
                height="200px"
                class="full-width"
                type="bar"
                :options="options"
                :series="series"
            )

        v-row(
            align="start"
            class="full-height full-width ma-0 mt-10 px-10"
            justify="start"
        )
            v-col(cols="12")

                v-card(
                    class="pa-5"
                    style="box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;"
                )
                    div(class="font-weight-bold mb-3")
                        | Selecione suas palavras chave

                    Me(
                        ref="me"
                        v-slot="{ loading, query }"
                        @done="__onDoneMe"
                        @error="__onErrorMe"
                    )

                        v-row(
                            justify="start"
                            class="full-width"
                        )

                            div(
                                class="col-auto pr-0"
                                v-for="(el, index) in palavras"
                                :key="index"
                                v-if="!palavrasSelecionadas.includes(el)"
                            )
                                v-btn(
                                    depressed
                                    rounded
                                    outlined
                                    color="green"
                                    dark
                                    @click="palavrasSelecionadas.push(el)"
                                )
                                    | {{ el }}

                        v-row(
                            justify="start"
                            class="full-width mb-2"
                        )
                            div(class="col-12 subtitle-2 text--darken-1 grey--text")
                                | Palavras selecionadas ({{ palavrasSelecionadas.length }})

                            div(
                                class="col-auto pr-0"
                                v-for="(el, index) in palavrasSelecionadas"
                                :key="index"
                            )
                                v-chip(
                                    close
                                    @click:close="palavrasSelecionadas.splice(index, 1)"
                                )
                                    | {{ el }}

                        v-row(
                            justify="start"
                            class="full-width mb-2"
                        )
                            v-col(cols="auto")
                                v-btn(
                                    depressed
                                    rounded
                                    color="primary"
                                    dark
                                    class="font-weight-bold"
                                    :loading="isLoading"
                                    @click="$refs.listOps.loadMore(query); isLoading = true"
                                )
                                    | Buscar Inovação

        v-row(class="px-12")
            v-col(cols="12")
                | Total Resultado: {{ total }}

        v-row(
            class="px-12"
            v-if="!listPatentOps"
        )
            v-col(cols="12")
                v-alert(
                    dense
                    type="info"
                )
                    | Não possui dados a serem exibidos

        v-row(
            v-else
            align="start"
            class="full-height full-width ma-0 mt-2 px-10"
            justify="start"
        )
            v-col(
                cols="12"
                md="6"
                v-for="(val, index) in listPatentOps"
                :key="val.docNumber"
            )
                v-card(
                    style="box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px; cursor: pointer;"
                    :loading="isLoading"
                    @click.native="val.modal = !val.modal"
                )
                    v-card-actions(class="pa-7")
                        div(class="row justify-center")
                            div(class="font-weight-bold full-width")
                                | {{ val.country }}{{ val.docNumber }}{{ val.kind }}

                            div(class="full-width text-lowercase")
                                | {{ val.inventionTitle }}

                        v-spacer

                        v-btn(
                            icon
                        )
                            v-icon
                                | {{ val.modal ? 'mdi-chevron-up' : 'mdi-chevron-down' }}

                    v-expand-transition
                        div(
                            class="mt-3 pa-5"
                            v-show="val.modal"
                        )
                            v-divider

                            div(class="mt-3 font-weight-bold")
                                | Descrição

                            | {{ val.abstract.p }}

                            div(class="mt-3 font-weight-bold")
                                | Número do aplicativo

                            | {{ val.applicationReference }}

                            div(class="mt-3 font-weight-bold")
                                | Publicação

                            | {{ val.country }}{{ val.docNumber }}{{ val.kind }}

                            div(class="mt-3 font-weight-bold")
                                | Data de publicação

                            | {{ val.bibliographicData.documentId[0].date }}

                            div(class="mt-3 font-weight-bold")
                                | Requerente

                            | {{ val.applicant }}

                            div(class="mt-3 font-weight-bold")
                                | Inventores

                            | {{ val.inventor }}

                            div(class="mt-3 font-weight-bold")
                                v-btn(
                                    block
                                    depressed
                                    color="info"
                                    target="_blank"
                                    :href="val.link"
                                )
                                    | Ver mais detalhes

        v-row(
            align="start"
            class="full-height full-width ma-0 mt-2 px-10"
            justify="start"
            v-show="total"
        )
            v-col(cols="12")
                v-pagination(
                    v-model="page"
                    total-visible="7"
                    :disabled="isLoading"
                    :length="Math.ceil(total/100)"
                    @input="(el) =>__onInputPage(el, query)"
                )

</template>
