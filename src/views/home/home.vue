<template>
  <div>

    <Row :gutter="20">
      <i-col :key="`infor-${i}`" span="6" style="height: 100px;" v-for="(infor, i) in infoCardData">
        <i-info-card :color="infor.color" :icon="infor.icon" :icon-size="36" :key="infor.title" shadow>
          <p class="count-style">{{ infor.count }}</p>
          <p>{{ infor.title }}</p>
        </i-info-card>
      </i-col>
    </Row>

    <Row style="margin: 20px 0">
      <Card shadow>
        <p slot="title">
          系统信息
        </p>
        <p :key="index" class="home-client" v-for="(item ,index) in client"><label>{{ index }}</label>{{ item }}</p>
      </Card>
    </Row>
  </div>
</template>

<script>
import IInfoCard from '@/components/i-info-card'
import config from '@/config'

const client = {
  前端版本: config.version,
  浏览器: window.navigator.userAgent
}

export default {
  name: 'home',
  components: {
    IInfoCard
  },
  data () {
    return {
      client: client,
      config: config,
      infoCardData: [
        { name: 'user:total', title: '总用户数', icon: 'md-person-add', count: 199, color: '#2d8cf0' },
        { name: 'user:today', title: '新增用户', icon: 'md-locate', count: 66, color: '#dd4b39' },
        { name: 'order:amount', title: '销售额', icon: 'md-cart', count: 999, color: '#00a65a' },
        { name: 'order:number', title: '订单数', icon: 'md-cart', count: 77, color: '#f39c12' }
      ]
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less">
.count-style {
  font-size: 40px;
}

.home-client {
  margin: 10px 0;
}

.home-client label {
  display: inline-block;
  width: 100px;
  /*text-align: right;*/
}
</style>
