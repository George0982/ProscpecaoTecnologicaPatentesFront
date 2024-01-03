<script>

export default {
    name: 'LayoutAuth',

    methods: {
        __onLogount () {
            this.$router.push('/')
            this.$apolloHelpers.onLogout(this.$apolloProvider.clients.defaultClient)
        }
    }
}
</script>

<template lang="pug">
v-app(dark)
    v-app-bar(
        app
        color="#0b2a43"
        dark
    )
        v-toolbar-title
            | Busca de Inovações

        v-spacer

        v-btn(
            text
            @click="__onLogount"
        )
            | Sair

    v-main(style="background: #fafbfc")
        nuxt

</template>
