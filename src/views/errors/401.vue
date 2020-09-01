<template>
  <error code="401" desc="Forbidden"/>
</template>

<script>
import error from './error.vue'

export default {
  name: 'error_401',
  components: {
    error
  }
}
</script>
