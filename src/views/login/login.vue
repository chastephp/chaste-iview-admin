<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card :bordered="false" icon="log-in" title="欢迎登录">
        <div class="form-con">
          <Form :model="form.model" :rules="form.rules" @keydown.enter.native="handleSubmit" ref="loginForm">
            <FormItem prop="account">
              <Input placeholder="请输入用户名" type="text" v-model="form.model.account">
                <span slot="prepend"><Icon :size="16" type="ios-person"></Icon></span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input placeholder="请输入密码" type="password" v-model="form.model.password">
                <span slot="prepend"><Icon :size="14" type="md-lock"></Icon></span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" long type="primary">登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">请输入管理员用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        model: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.handleLogin(this.form.model).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$Message.success(res.message)
              this.$router.push({
                name: 'home'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
