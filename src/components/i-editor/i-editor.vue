<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import auth from '@/libraries/auth'

export default {
  name: 'IEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.editorId}`)

    this.editor.customConfig.onchangeTimeout = 10
    this.editor.customConfig.pasteFilterStyle = false
    this.editor.customConfig.onchange = (html) => {
      this.$emit('input', html)
      this.$emit('on-change', html)
    }

    this.editor.customConfig.uploadImgServer = this.$config.uploadAction
    this.editor.customConfig.uploadImgHeaders = {
      Authorization: 'Bearer ' + auth.getToken()
    }
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.uploadImgMaxLength = 1
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        insertImg(result.data.url)
      }
    }

    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    this.editor.txt.html(this.value)
  }
}
</script>

<style>
.ivu-form-item-content {
  font-size: 14px;
}

.w-e-toolbar {
  background-color: #fff !important;
}
</style>
