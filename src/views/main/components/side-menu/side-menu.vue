<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <div class="menu-expanded" v-show="!collapsed">
      <Menu :accordion="accordion" :active-name="activeName" :open-names="openedNames" :theme="theme"
            @on-select="handleSelect" ref="menu" width="auto">
        <template v-for="item in menuList">
          <side-menu-item :key="`menu-${item.name}`" :parent="item"></side-menu-item>
        </template>
      </Menu>
    </div>
    <div class="menu-collapsed" v-show="collapsed">
      <template v-for="item in menuList">
        <collapsed-menu :icon-size="iconSize" :key="`drop-menu-${item.name}`" :parent="item"
                        :root-icon-size="rootIconSize" :theme="theme" @on-click="handleSelect" hide-title
                        v-if="item.children && item.children.length > 0"></collapsed-menu>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { arrayUnion } from '@/libraries/util'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [mixin],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === 'home') this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = arrayUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    this.openedNames = arrayUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
