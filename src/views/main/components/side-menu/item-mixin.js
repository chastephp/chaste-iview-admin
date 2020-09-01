export default {
  props: {
    parent: {
      type: Object,
      default: () => {}
    },
    theme: String,
    iconSize: Number
  },
  computed: {
    parentName () {
      return this.parent.name
    },
    children () {
      return this.parent.children
    },
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  }
}
