<template lang="pug">
apollo-query(
  v-slot="{ result, gqlError, isLoading }"
  :query="require('@/gql/Company.gql')"
  @result="result => $emit('done', result.data.company)"
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
    name: 'Company'
}
</script>
