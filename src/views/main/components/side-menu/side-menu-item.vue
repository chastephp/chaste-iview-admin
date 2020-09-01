<template>
  <Submenu :name="parentName">
    <template slot="title">
      <Icon :type="parent.icon || ''"/>
      <span>{{ parent.meta.title }}</span>
    </template>
    <template v-for="item in children">
      <side-menu-item :key="`menu-${item.name}`" :parent="item"
                      v-if="item.children && item.children.length > 0"></side-menu-item>
      <menu-item :key="`menu-${item.name}`" :name="item.name" :to="item.meta.href || {name:item.name}" v-else>
        <Icon :type="item.icon || ''"/>
        <span>{{ item.meta.title }}</span></menu-item>
    </template>
  </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'

export default {
  name: 'SideMenuItem',
  mixins: [mixin, itemMixin]
}
</script>
