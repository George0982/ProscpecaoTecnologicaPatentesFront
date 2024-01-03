<template lang="pug">
    v-navigation-drawer(
        app
        dark
        class="px-1"
        color="#263447"
        id="app-drawer"
        mini-variant-width="80"
        v-model="inputValue"
        width="340"
        :expand-on-hover="$vuetify.breakpoint.mdAndUp"
        :permanent="$vuetify.breakpoint.mdAndUp"
    )
        v-list
            v-list-item(class="px-2")
                v-list-item-avatar
                    v-img(:src="logo")

                v-img(
                    style="max-width: 120px;"
                    :src="logoText"
                )

        v-divider(
            class="mx-4"
            color="white"
        )

        v-list(rounded)
            v-list-group(active-class="white--text transparent")
                template(
                    v-slot:activator
                    class="white--text"
                )
                    v-list-item-avatar
                        v-img(:src="require('@/static/james.jpg')")

                    v-list-item-content
                        v-list-item-title
                            | {{ $store.state.user.user.no_usuario || '' }}

                v-list-item(
                    class="white--text"
                    @click="__logout"
                )
                    v-list-item-content
                        v-list-item-title
                            | Logout

        v-divider(
            class="mx-4"
            color="white"
        )

        v-list(
            nav
            rounded
        )
            v-list-item(height="50")
                v-list-item-title(
                    class="subtitle-1 font-weight-bold"
                    style="color: #23cf87"
                )
                    | Energia

                v-list-item-icon
                    v-icon(style="color: #23cf87")
                        | mdi-flash-outline

            v-list-item(
                link
                active-class="white secondary--text"
                class="white--text"
                v-for="(link, i) in links"
                :key="i"
                :to="link.to"
            )
                v-list-item-icon
                    v-icon(color="rgb(24, 206, 15)")
                        | {{ link.icon }}

                v-list-item-title(class="caption")
                    | {{ link.text }}

</template>

<script>

import { mapMutations } from 'vuex'

export default {
    data: () => ({
        drawer: false,
        logoText: require('@/static/type-logo.svg'),
        logo: require('@/static/icon-logo.svg'),
        links: [
            {
                to: '/relatorios/relatorioConsumo',
                icon: 'mdi-text-box-multiple-outline',
                text: 'Relatórios de Consumo'
            },
            {
                to: '/relatorios/RelatorioOperacao',
                icon: 'mdi-text-box-multiple-outline',
                text: 'Relatório de Operação'
            }
        ]
    }),

    computed: {
        inputValue: {
            get () {
                return this.$store.state.app.drawer
            },
            set (val) {
                this.setDrawer(val)
            }
        }
    },

    methods: {
        ...mapMutations('app', ['setDrawer', 'toggleDrawer']),

        __logout () {
            window.localStorage.clear()
            this.$store.commit('user/setAuth', null)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.theme--dark.v-list-item--active::before {
  opacity: 0;
}
</style>
