<template lang="pug">
apollo-query(
  v-slot="{ result, gqlError, isLoading }"
  :query="require('@/gql/ListDiagnosticos.gql')"
  @result="result => $emit('done', result.data.listDiagnosticos)"
  @loading="isLoading => $emit('loading', isLoading)"
)
  slot(
    :data="result"
    :error="gqlError"
    :loading="isLoading"
  )

</template>
<script>
export default {
    name: 'ListDiagnosticos'
}
</script>
