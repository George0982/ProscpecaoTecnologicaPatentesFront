<template lang="pug">
apollo-query(
  v-slot="{ result, gqlError, isLoading }"
  :query="require('@/gql/Diagnostico.gql')"
  @result="result => $emit('done', result.data.diagnostico)"
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
    name: 'Diagnostico'
}
</script>
