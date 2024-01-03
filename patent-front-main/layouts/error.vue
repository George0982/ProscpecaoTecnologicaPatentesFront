<script>
export default {
    layout: 'auth',

    props: {
        error: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            pageNotFound: '404 Not Found',
            otherError: 'An error occurred'
        }
    },
    head () {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title
        }
    }
}
</script>

<template lang="pug">
v-app(dark)
    h1(v-if="error.statusCode === 404")
        | {{ pageNotFound }}

    h1(v-else)
        | {{ otherError }}

    div(to='/')
        | Home page

</template>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
