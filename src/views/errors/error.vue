<template>
  <div class="error-page">
    <div class="flex-center position-ref full-height">
      <div class="content">
        <div class="title">
          {{ desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './error.css'

export default {
  name: 'ErrorLayout',
  props: {
    desc: String
  }
}
</script>
