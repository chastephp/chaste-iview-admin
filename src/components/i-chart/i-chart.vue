<template>
  <div class="i-chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'IChart',
  props: {
    value: Object
  },
  watch: {
    value: function () {
      this.renderChart()
    }
  },
  methods: {
    renderChart () {
      this.$nextTick(() => {
        echarts.dispose(this.$refs.dom, 'tdTheme')
        const dom = echarts.init(this.$refs.dom, 'tdTheme')
        dom.setOption(this.value)
      })
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>

<style lang="less">
.charts {
  //
}
</style>
