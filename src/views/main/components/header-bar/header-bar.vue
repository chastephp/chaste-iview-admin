<template>
  <div class="header-bar">
    <SiderTrigger :collapsed="collapsed" @on-change="handleCollpasedChange" icon="md-menu"></SiderTrigger>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SiderTrigger from './sider-trigger'
import './header-bar.less'

export default {
  name: 'HeaderBar',
  components: {
    SiderTrigger
  },
  props: {
    collapsed: Boolean
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
