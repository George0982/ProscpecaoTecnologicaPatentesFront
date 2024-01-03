<script>
export default {
    name: 'ListPatentOps',

    props: {
        q: {
            type: Array,
            default: null
        },
        range: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            localLoading: false,
            skipQuery: true,
            qLocal: null,
            rangeLocal: null
        }
    },

    watch: {
        q: {
            immediate: true,
            handler (val, oldVal) {
                let palavraText = ''

                val.length && val.forEach((el, i) => {
                    const agregador = i > 0 ? '&' : ''
                    palavraText = palavraText + agregador + el
                })

                this.qLocal = palavraText
            }
        },
        range: {
            immediate: true,
            handler (val) {
                // this.skipQuery = false
                this.rangeLocal = val
            }
        }
    },

    methods: {
        async loadMore (query) {
            this.skipQuery = false

            try {
                await query.refetch()
            } catch (e) {
                console.log(e)
            }
        }
    }

}
</script>
<template lang="pug">
apollo-query(
    ref="teste"
    v-slot="{ result: { error, data }, query }"
    :skip="skipQuery"
    :variables="{ q: qLocal, range: rangeLocal }"
    :query="require('@/gql/ListPatentOps.gql')"
    @result="result => { $emit('done', result.data), skipQuery = true }"
    @loading="isLoading => $emit('loading', isLoading)"
)
    slot(
        :query="query"
        :data="data"
        :error="error"
        :loading="localLoading"
    )

</template>
