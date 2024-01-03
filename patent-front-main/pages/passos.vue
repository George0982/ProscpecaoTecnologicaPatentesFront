<script>
import FormCnpj from '@/components/organisms/forms/FormSearchCnpj.vue'
import FormCompany from '@/components/organisms/forms/FormCompany.vue'

export default {

    name: 'PagePassos',

    components: {
        FormCnpj,
        FormCompany
    },

    layout: 'auth',

    middleware: 'authenticated',

    data () {
        return {
            company: {
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
        }
    },

    created () {
        if (this.$store.state.company.company) {
            // this.$router.push('/lista')
        }
    }
}
</script>

<template lang="pug">
v-row(
    class="full-height full-width ma-0 mt-10"
    justify="center"
)
    v-col(
        cols="12"
        md="8"
        sm="8"
    )

        v-card(
            class="pa-8"
            style="box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;"
        )

            v-col(
                cols="12"
                class="font-weight-bold text-h6 pa-0 pb-3"
            )
                | Buscar dados da empresa

            v-col(cols="12")
                FormCnpj(
                    @done="(el) => company = el.companySerpro"
                )

        v-card(
            class="pa-8 mt-5"
            style="box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;"
            v-if="company.ni"
        )
            FormCompany(:company="company")

</template>
