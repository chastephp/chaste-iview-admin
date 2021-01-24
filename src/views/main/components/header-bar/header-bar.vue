<template>
  <div class="header-bar">
    <SiderTrigger :collapsed="collapsed" @on-change="handleCollpasedChange" icon="md-menu"></SiderTrigger>
    <div style="display: inline-block;vertical-align: top;margin-left: 10px">
      <Breadcrumb>
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem :key="item.name" v-for="item in breadcrumbs">{{ item.meta.title || '' }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
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
  computed: {
    breadcrumbs () {
      return this.$store.state.app.breadcrumbs
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
