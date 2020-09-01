import Mock from 'mockjs'

Mock.mock('/auth/login', {
  code: 0, message: '登录成功', data: { access_token: 'access_token', account: '15888888888' }
})

export default Mock
