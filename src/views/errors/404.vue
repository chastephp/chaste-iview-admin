<template>
  <error code="404" desc="Sorry, the page you are looking for could not be found."/>
</template>

<script>
import error from './error.vue'

export default {
  name: 'error_404',
  components: {
    error
  }
}
</script>
