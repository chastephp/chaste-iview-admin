<template>
  <div>
    <Menu mode="horizontal" theme="light" active-name="2">
      <MenuItem name="2">编辑图书</MenuItem>
    </Menu>

    <br/>
    <Card>
      <Spin v-if="loading" class="loading-tip" size="large"></Spin>

      <IForm :form="form" @on-submit="handleSubmit"></IForm>
    </Card>
  </div>
</template>

<style>

</style>

<script>
import IForm from '@/components/i-form'
import { Item, Rule } from '@/libraries/ivu'

const isPublic = [{
  key: 0,
  val: '隐藏'
}, {
  key: 1,
  val: '公开'
}]

export default {
  components: {
    IForm
  },
  data () {
    return {
      loading: false,
      form: {
        model: {
          id: 0,
          title: '',
          desc: '',
          is_public: 0,
          image: '',
          content: '',
          order_value: 0
        },
        submitButtonText: '提交',
        items: {
          title: Item.input('名称', { rules: Rule.required.string() }),
          desc: Item.textarea('描述', { rules: Rule.required.string() }),
          is_public: Item.radio('是否公开', {
            options: isPublic,
            rules: [Rule.required.number()]
          }),
          image: {
            type: 'uploadImage',
            tip: '640*800',
            label: '主图',
            max: 1,
            data: { folder: 'topic' },
            rules: [Rule.required.string()]
          },
          content: Item.editor('内容', { rules: Rule.required.string() }),
          order_value: Item.inputNumber('排序', { rules: Rule.order() })
        }
      }
    }
  },
  methods: {
    handleSubmit (params) {
      const msg = this.$Message.loading({
        content: '提交中...',
        duration: 2
      })

      const data = this.form.model

      api.book.save(data).then(res => {
        if (res.code === 0) {
          this.$router.push({ name: '/components/list' })
        }
        msg()
      })
    }
  },
  mounted () {
    const id = this.$route.params.id || 0

    if (id) {
      const row = {}
      if (!row) {
        this.$Message.error('数据不存在')
        return
      }

      for (const i in this.form.model) {
        if (row.hasOwnProperty(i)) this.form.model[i] = row[i]
      }
    }
  }
}
</script>
