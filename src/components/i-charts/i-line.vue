<template>
  <div class="charts chart-line" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'IChartLine',
  props: {
    value: Object
  },
  watch: {
    value: function () {
      this.$nextTick(() => {
        echarts.dispose(this.$refs.dom, 'tdTheme')
        const dom = echarts.init(this.$refs.dom, 'tdTheme')
        dom.setOption(this.value)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log('line', this.value)
      const dom = echarts.init(this.$refs.dom, 'tdTheme')
      dom.setOption(this.value)
    })
  }
}
</script>

<style lang="less">
.charts {
  //
}
</style>
