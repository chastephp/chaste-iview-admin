<template>
  <Form :inline="inline" :label-width="100" :model="form.model" :rules="form.rules" ref="form" v-if="!form.disabled">
    <FormItem
      :key="prop"
      :label="item.label"
      :prop="prop"
      :rules="item.rules"
      v-for="(item, prop) in form.items">

      <Select :disabled="item.disabled" :multiple="item.multiple" :style="item.style"
              v-if="item.type == 'select'"
              v-model="form.model[prop]">
        <template v-if="Array.isArray(item.options)">
          <Option :key="item.key" :value="item.key" v-for="item in item.options">{{ item.val }}</Option>
        </template>
        <template v-else>
          <Option :key="_key" :value="_key" v-for="(_item,_key) in item.options">{{ _item }}</Option>
        </template>
      </Select>

      <RadioGroup :disabled="item.disabled" v-else-if="item.type == 'radio'" v-model="form.model[prop]">
        <Radio :disabled="item.disabled" :key="item.key" :label="item.key" v-for="item in item.options">{{ item.val }}
        </Radio>
      </RadioGroup>

      <CheckboxGroup :disabled="item.disabled" v-else-if="item.type == 'checkbox'" v-model="form.model[prop]">
        <Checkbox :key="item.key" :label="item.key" v-for="item in item.options">{{ item.val }}</Checkbox>
      </CheckboxGroup>

      <Input :disabled="item.disabled" :placeholder="item.placeholder || item.label"
             :style="item.style" v-else-if="item.type == 'input'"
             v-model="form.model[prop]"/>

      <Input :disabled="item.disabled" :placeholder="item.placeholder || item.label"
             :rows="item.rows || 2" :style="item.style"
             type="textarea" v-else-if="item.type == 'textarea'"
             v-model="form.model[prop]"/>

      <Input :disabled="item.disabled" :placeholder="item.placeholder || item.label"
             :style="item.style"
             type="password" v-else-if="item.type == 'password'"
             v-model="form.model[prop]"/>

      <InputNumber :disabled="item.disabled" :min="item.min || -Infinity"
                   :placeholder="item.placeholder || item.label"
                   :style="item.style" v-else-if="item.type == 'inputNumber'"
                   v-model="form.model[prop]"/>

      <Upload :action="item.action" :headers="headers" v-else-if="item.type == 'upload'">
        <Button icon="ios-cloud-upload-outline">上传</Button>
      </Upload>

      <UploadImage :action="item.action" :data="item.data || {}"
                   :max="item.max || 1" :multiple="item.multiple || false"
                   :tip="item.tip" v-else-if="item.type == 'uploadImage'"
                   v-model="form.model[prop]">
      </UploadImage>

      <DatePicker :disabled="item.disabled" :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                  :placeholder="item.placeholder ||  item.label" :style="item.style || {}"
                  type="datetime"
                  v-else-if="item.type == 'datePicker'"
                  v-model="form.model[prop]"></DatePicker>

      <editor v-else-if="item.type == 'editor'" v-model="form.model[prop]"/>

      <span style="margin-left: 16px;" v-html="item.tip" v-if="item.type != 'uploadImage' && item.tip"></span>
    </FormItem>
    <FormItem v-if="!view">
      <Button @click="handleSubmit" type="primary">{{ form.submitButtonText || '搜索' }}</Button>
      <Button @click="handleExport" style="margin-left:12px;" type="primary" v-if="form.export">导出</Button>
      <Button @click="handleReset" style="margin-left: 12px" v-if="inline">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
import Vue from 'vue'
import Editor from '../i-editor'
import UploadImage from '../i-upload-image'

export default {
  name: 'iForm',
  components: {
    Editor,
    UploadImage
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    view: { // 查看模式
      type: Boolean,
      default: false
    },
    form: {
      type: Object
    }
  },
  data () {
    return {
      headers: {}
    }
  },
  methods: {
    style (style) {
      if (this.inline) {
        return Object.assign({ width: '180px' }, style)
      }
      return style
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('on-submit', JSON.parse(JSON.stringify(this.form.model)))
        } else {
          this.$Message.error('表单校验错误')
          console.log(this.form.model)
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    },
    handleExport () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('on-export', JSON.parse(JSON.stringify(this.form.model)))
        } else {
          this.$Message.error('表单校验错误')
          console.log(this.form.model)
        }
      })
    }
  },
  mounted () {
    if (this.inline) {
      for (const i in this.form.items) {
        Vue.set(this.form.items[i], 'style', Object.assign({ width: '180px' }, this.form.items[i].style))
      }
    }
  }
}
</script>

<style>

</style>
