<script>

export default {
    name: 'PageForbidden',

    layout: 'LayoutInternal',

    middleware: 'authenticated',

    methods: {
        onBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<template lang="pug">
    v-row(
        align="center"
        class="full-height full-width pa-0 ma-0"
        justify="center"
    )
        v-col(
            class="text-center"
            cols="12"
            md="5"
            sm="8"
        )
            img(
                style="max-width: 300px; max-height: 300px"
                src="@/static/safe.svg"
            )

            h2(class="my-4")
                | Você não tem acesso à página que tentou acessar

            div
                | Parece que você está tentando acessar uma página à qual não possui acesso.
                | Se você deveria ter acesso, envie um ticket para nossa equipe na página:

            div(class="font-weight-bold mt-4")
                | Suporte > Criar Ticket

            div(class="mt-4")
                v-btn(
                    depressed
                    color="primary"
                    @click="$router.push('/')"
                )
                    | Voltar

</template>
