<template>
  <div>
    <div :key="item.url" class="i-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img alt="" :src="item.url"/>
        <div class="i-upload-list-cover">
          <Icon @click.native="handleView(item.url)" type="ios-eye-outline"></Icon>
          <Icon @click.native="handleRemove(item)" type="ios-trash-outline"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress :percent="item.percentage" hide-info v-if="item.showProgress"></Progress>
      </template>
    </div>
    <Upload
      :action="uploadAction"
      :before-upload="handleBeforeUpload"
      :data="data"
      :default-file-list="defaultList"
      :format="['jpg','jpeg','png']"
      :headers="headers"
      :max-size="4096"
      :multiple="multiple"
      :on-exceeded-size="handleMaxSize"
      :on-format-error="handleFormatError"
      :on-success="handleSuccess"
      :show-upload-list="false"
      ref="upload"
      style="display: inline-block;width:58px;"
      type="drag">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon size="20" type="ios-camera"></Icon>
      </div>
    </Upload>
    <div class="i-upload-tip" v-html="tip" v-if="tip"></div>
    <Modal :footer-hide="true" title="查看" v-model="visible">
      <img :src="viewImageSrc" style="width: 100%" v-if="visible">
    </Modal>
  </div>
</template>
<script>
import Vue from 'vue'
import auth from '@/libraries/auth'

export default {
  name: 'IUploadImage',
  props: {
    data: {
      type: Object
    },
    value: {
      type: [Array, String],
      default: ''
    },
    max: {
      type: Number,
      default: 1
    },
    action: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: true
    },
    beforeUpload: {
      type: Function,
      default () {
        return {}
      }
    },
    onSuccess: {
      type: Function,
      default () {
        return {}
      }
    }
  },
  computed: {
    uploadAction: function () {
      return this.action || this.$config.uploadAction
    },
    defaultList: function () {
      const value = this.value
      const ret = []
      if (value) {
        if (!Array.isArray(value)) {
          return [{ url: value, name: value }]
        } else { // ["url1","url2"]
          value.forEach(item => {
            ret.push({ url: item, name: item })
          })
        }
      }

      return ret
    }
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + auth.getToken()
      },
      uploadList: [],
      visible: false,
      viewImageSrc: ''
    }
  },
  methods: {
    handleView (src) {
      this.viewImageSrc = src
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.onChange()
    },
    handleBeforeUpload (file) {
      const check = this.uploadList.length < this.max
      if (!check) {
        this.$Notice.warning({
          title: `最多上传${this.max}张图片`
        })

        return false
      }

      if (this.beforeUpload) {
        return this.beforeUpload(file)
      }
      return check
    },
    handleSuccess (res, file) {
      if (this.onSuccess && this.onSuccess(res, file) === false) {
        return false
      }
      file.url = res.data.url // return url

      this.onChange()
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    onChange () {
      const fileList = this.$refs.upload.fileList
      this.uploadList = fileList // 重新赋值

      let ret = this.max > 1 ? [] : ''

      // 单图模式
      if (this.max <= 1) {
        if (fileList[0]) ret = fileList[0].url

        this.$emit('input', ret)
      } else { // 多图模式
        for (let i = 0; i < fileList.length; i++) {
          ret.push(fileList[i].url)
        }

        return this.$emit('input', ret)
      }
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  watch: {
    value: function () { // 监控value的变化
      Vue.nextTick(() => {
        this.uploadList = this.$refs.upload.fileList
      })
    }
  }
}
</script>
<style>
.i-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  margin-right: 4px;
}

.i-upload-tip {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-left: 16px;
}

.i-upload-list img {
  width: 100%;
  height: 100%;
}

.i-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
}

.i-upload-list:hover .i-upload-list-cover {
  display: block;
}

.i-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
