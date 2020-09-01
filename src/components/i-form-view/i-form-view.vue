<template>
  <Form :label-width="100" ref="form">
    <FormItem
      :key="index"
      :label="item.title"
      :prop="item.key"
      v-for="(item, index) in form.items">
      <SpanExpand :model="form.model" :prop="item.key" :render="item.render" v-if="item.render"/>
      <span class="ivu-form-item-static" v-else v-html="form.model[item.key]"></span>
    </FormItem>
  </Form>
</template>

<script>
import SpanExpand from './expand'

export default {
  name: 'iFormView',
  components: {
    SpanExpand
  },
  props: {
    form: {
      type: Object
    }
  },
  methods: {},
  mounted () {
  }
}
</script>

<style>
.ivu-form-item-content .ivu-form-item-static {

}
</style>
