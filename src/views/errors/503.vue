<template>
  <error code="503" desc="Service Unavailable"/>
</template>

<script>
import error from './error.vue'

export default {
  name: 'error_503',
  components: {
    error
  }
}
</script>
