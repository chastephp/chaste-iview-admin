<template>
  <div>
    <Menu active-name="2" mode="horizontal" theme="light">
      <MenuItem name="2">修改密码</MenuItem>
    </Menu>

    <br/>
    <Card>
      <IForm :form="form" @on-submit="handleSubmit"></IForm>
    </Card>
  </div>
</template>

<style>

</style>

<script>
import IForm from '@/components/i-form'
import { page } from './page'
import { mapActions } from 'vuex'
import { Item, Rule } from '@/libraries/ivu'

export default {
  components: {
    IForm
  },
  data () {
    return {
      page: page,
      id: false,
      form: {
        items: {
          new_password: Item.input('新密码', { rules: [Rule.required.string()] })
        },
        model: {
          new_password: ''
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),

    handleSubmit () {
      const msg = this.$Message.loading({
        content: '提交中...',
        duration: 2
      })

      const data = this.form.model

      api.admin.changePassword(data).then(res => {
        if (res.code === 0) {
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
        }
        msg()
      })
    }
  },
  mounted () {
  }
}
</script>
