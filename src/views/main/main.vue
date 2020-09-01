<template>
  <Layout class="main" style="height: 100%">
    <Sider :collapsed-width="50" :style="{overflow: 'hidden'}" :width="200" class="left-sider" collapsible hide-trigger
           v-model="collapsed">
      <side-menu :active-name="$route.name" :collapsed="collapsed" :menu-list="menuList" @on-select="turnToPage" accordion
                 ref="sideMenu">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <router-link to="/home">
          <div class="logo-con">
            <p v-show="!collapsed">Chaste</p>
            <p v-show="collapsed">C</p>
          </div>
        </router-link>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <HeaderBar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <User :username="username"/>
          <FullScreen style="margin-right: 10px;" v-model="isFullScreen"/>
        </HeaderBar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <router-view/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import User from './components/user'
import FullScreen from './components/fullscreen'

import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import { mapActions } from 'vuex'
import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    FullScreen,
    User
  },
  data () {
    return {
      collapsed: false,
      isFullScreen: false
    }
  },
  computed: {
    username () {
      return this.$store.state.user.user.account
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),

    handleCollapsedChange (state) {
      this.collapsed = state
    },

    handleClick (item) {
      this.turnToPage(item)
    },

    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      this.$router.push({
        name,
        params,
        query
      })
    },

    checkUpdate () {
      // 检查更新
      setInterval(() => {
        fetch('/index.html?t=' + (+new Date())).then((response) => {
          response.text().then((data) => {
            const el = document.createElement('div')
            el.innerHTML = data
            const version = el.getElementsByTagName('meta').version.getAttribute('content')

            if (version !== this.$config.version) {
              console.log(`前端版本有更新啦，请清空缓存刷新浏览器更新！当前版本是：${this.$config.version} 最新版本是：${version}`)
              this.$Notice.warning({
                title: '更新提醒',
                duration: 0,
                desc: '前端版本有更新啦，请清空缓存刷新浏览器更新！'
              })
            } else {
              console.log('已经是最新版本了！')
            }
          })
        }).catch(() => {
        })
      }, 1000 * 60)
    }
  },
  mounted () {
    // 配置下message
    this.$Message.config({
      top: (document.body.clientHeight / 2 - 60) > 24 ? (document.body.clientHeight / 2 - 60) : 24,
      duration: 3
    })

    // 检查更新
    this.checkUpdate()
  }
}
</script>
