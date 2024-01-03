<template lang="pug">
apollo-query(
  v-slot="{ result, gqlError, isLoading }"
  :query="require('@/gql/Me.gql')"
  @result="result => $emit('done', result.data.me)"
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
    name: 'Me'
}
</script>
