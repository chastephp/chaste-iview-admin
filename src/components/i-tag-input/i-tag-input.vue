<template>
  <div class="cs-i-tag-input-wrapper">
    <Input
      :key="key"
      ref="tagInput"
      :placeholder="placeholder"
      type="text"
      v-model="tag"
      @on-enter="add"
      class="cs-i-new-tag">
      <Tag slot="prepend" color="primary"
           v-for="(item,key) in innerTags" :key="item" :name="item" closable @on-close="remove(key)">{{ item }}
      </Tag>
    </Input>
  </div>
</template>
<script>
export default {
  name: 'ITagInput',
  data () {
    return {
      innerTags: [...this.value],
      tag: '',
      shouldFocus: true
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    key: function () { // 重新渲染input
      return JSON.stringify(this.innerTags)
    }
  },
  watch: {
    value () {
      this.innerTags = [...this.value]
    }
  },
  methods: {
    add (e) {
      if (!this.innerTags.includes(this.tag)) {
        this.innerTags.push(this.tag)
        this.tag = ''
        this.tagChange()
      }
      this.shouldFocus = true
      e && e.preventDefault()
    },
    remove (index) {
      this.shouldFocus = false
      this.innerTags.splice(index, 1)
      this.tagChange()
    },
    tagChange () {
      this.$emit('input', this.innerTags)
    }
  },
  updated () {
    this.shouldFocus && this.$refs.tagInput.focus()
  }
}
</script>

<style>
.cs-i-tag-input-wrapper .ivu-input-group-prepend {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
