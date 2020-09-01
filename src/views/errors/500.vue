<template>
  <error code="500" desc="Whoops, looks like something went wrong."/>
</template>

<script>
import error from './error.vue'

export default {
  name: 'error_500',
  components: {
    error
  }
}
</script>
