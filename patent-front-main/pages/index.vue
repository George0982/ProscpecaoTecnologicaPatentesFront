<script>
import FormLogin from '@/components/organisms/forms/FormLogin.vue'

export default {
    name: 'PageLogin',

    components: {
        FormLogin
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
                | Login Patente
            //- Formulario de Login
            v-col(cols="12")
                form-login

            v-col(
                class="ma-0 pa-0"
                cols="12"
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
                    @click="$router.push('/cadastro')"
                )
                    | Cadastre-se

</template>
