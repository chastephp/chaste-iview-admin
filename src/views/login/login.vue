<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card :bordered="false" icon="log-in" title="欢迎登录">
        <div class="form-con">
          <Form :model="form.model" :rules="form.rules" @keydown.enter.native="handleSubmit" ref="loginForm">
            <FormItem prop="username">
              <Input placeholder="请输入用户名" type="text" v-model="form.model.username">
                <span slot="prepend"><Icon :size="16" type="ios-person"></Icon></span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input placeholder="请输入密码" type="password" v-model="form.model.password">
                <span slot="prepend"><Icon :size="14" type="md-lock"></Icon></span>
              </Input>
            </FormItem>
            <FormItem prop="captcha">
              <Row>
                <Col span="14">
                  <Input placeholder="请输入验证码" type="text" v-model="form.model.captcha">
                    <span slot="prepend"><Icon :size="14" type="ios-keypad"></Icon></span>
                  </Input>
                </Col>
                <Col style="padding-left: 10px" span="10" class="login-captcha">
                  <Button @click="refreshCaptcha">
                    <img :src="image">
                  </Button>
                </Col>
              </Row>
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
      image: '',
      submitting: false,
      form: {
        model: {
          key: '',
          captcha: '',
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    refreshCaptcha () {
      api.captcha().then(res => {
        this.image = res.data.base64
        this.form.model.key = res.data.key
      })
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.submitting) return
          this.submitting = true
          const loading = this.$Message.loading({
            content: '登陆中',
            duration: 10
          })
          this.handleLogin(this.form.model).then(res => {
            loading()
            this.submitting = false
            if (res.code === 0) {
              this.getUserInfo().then(res => {
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
      })
    }
  },
  mounted () {
    this.refreshCaptcha()
  }
}
</script>

<style>
.login-captcha .ivu-btn {
  width: 100%;
}

.login-captcha .ivu-btn img {
  height: 26px;
  position: relative;
  top: 4px;
}
</style>
