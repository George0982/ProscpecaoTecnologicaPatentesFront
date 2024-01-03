<script>
import FormCadastro from '@/components/organisms/forms/FormCadastro.vue'

export default {
    name: 'PageCadastro',

    components: {
        FormCadastro
    },

    layout: 'default',

    middleware: 'notAuthenticated'
}
</script>

<template lang="pug">
v-row(
    align="center"
    class="full-height full-width ma-0"
    justify="center"
)
    v-col(
        cols="12"
        md="3"
        sm="8"
    )

        v-card(
            class="pa-8"
            style="box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;"
        )

            v-col(
                cols="12"
                class="font-weight-bold text-h6"
            )
                | Cadastre-se

            //- Formulario de Login
            v-col(cols="12")
                form-cadastro

</template>
