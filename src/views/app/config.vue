<template>
  <div>
    <Menu active-name="1" mode="horizontal" theme="light">
      <MenuItem name="1">
        系统配置
      </MenuItem>
    </Menu>

    <br/>
    <Card>
      <Form :label-width="100" :model="form.model" :rules="form.rules" ref="form">

        <FormItem label="站点名称" prop="site_name">
          <Input placeholder="站点名称" style="width: 200px" type="text" v-model="form.model.site_name"></Input>
        </FormItem>

        <FormItem label="LOGO" prop="logo">
          <Input placeholder="LOGO" style="width: 200px" type="text" v-model="form.model.logo"></Input>
        </FormItem>

        <FormItem>
          <Button @click="handleSubmit('form')" type="primary">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<style>

</style>

<script>
export default {
  data () {
    return {
      form: {
        model: {
          site_name: 'ChasteCMS',
          logo: ''
        },
        rules: {
          // site_name: [
          //   { required: true, message: '不能为空', trigger: 'blur' }
          // ]
        }
      }
    }
  },
  methods: {
    handleSubmit (params) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const msg = this.$Message.loading({
            content: '提交中...',
            duration: 2
          })

          const data = Object.assign({}, this.form.model)

          api.app.config.update(data).then(res => {
            if (res.code === 0) {
              this.$Message.success(res.message || res.msg)
            } else {
              this.$Message.error(res.message || res.msg)
            }
            msg()
          })
        } else {
          this.$Message.error('表单校验错误')
        }
      })
    }
  },
  mounted () {
    api.app.config.list().then(res => {
      const config = res.data

      for (const i in this.form.model) {
        if (config && config.hasOwnProperty(i)) this.form.model[i] = config[i]
      }
    })
  }
}
</script>
