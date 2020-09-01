<template>
  <Dropdown :placement="placement" @on-click="handleClick" transfer>
    <a :style="{textAlign: !hideTitle ? 'left' : ''}" @mouseover="handleMousemove($event, children)" class="drop-menu-a"
       type="text">
      <Icon :color="textColor" :size="rootIconSize" :type="parent.icon"/>
      <span class="menu-title" v-if="!hideTitle">{{ showTitle(parent) }}</span>
      <Icon :size="16" style="float: right;" type="ios-arrow-forward" v-if="!hideTitle"/>
    </a>
    <DropdownMenu slot="list">
      <template v-for="child in children">
        <collapsed-menu :icon-size="iconSize" :key="`drop-${child.name}`" :parent="child"
                        v-if="showChildren(child)"></collapsed-menu>
        <DropdownItem :key="`drop-${child.name}`" :name="child.name" v-else>
          <Icon :size="iconSize" :type="child.icon"/>
          <span class="menu-title">{{ showTitle(child) }}</span></DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'

export default {
  name: 'CollapsedMenu',
  mixins: [mixin, itemMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    rootIconSize: {
      type: Number,
      default: 16
    }
  },
  data () {
    return {
      placement: 'right-end'
    }
  },
  methods: {
    handleClick (name) {
      this.$emit('on-click', name)
    },
    handleMousemove (event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
    }
  }
}
</script>
