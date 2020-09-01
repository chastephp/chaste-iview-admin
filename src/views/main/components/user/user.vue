<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <span class="user-username" v-text="username"></span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="password">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'

export default {
  name: 'User',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions([
      'handleLogout'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogout().then(res => {
            window.location.reload()
          })
          break
        case 'password': {
          this.$router.push({
            name: 'password'
          })
          break
        }
      }
    }
  }
}
</script>
