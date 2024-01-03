<template lang="pug">
    v-app-bar(
        dark
        app
        color="#263447"
    )
        v-app-bar-nav-icon(@click.stop="__onClickBtn")

        v-toolbar-title(class="row")
            img(
                style="max-width: 150px;"
                :src="logo"
            )
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data: () => ({
        logo: require('@/static/logo-PowerRev-White.png')
    }),

    methods: {
        ...mapMutations('app', ['setDrawer', 'toggleDrawer']),

        __onClickBtn () {
            this.setDrawer(!this.$store.state.app.drawer)
        }
    }
}
</script>
