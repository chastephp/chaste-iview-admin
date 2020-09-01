<template>
  <div class="charts chart-bar" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'IChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  mounted () {
    this.$nextTick(() => {
      const xAxisData = Object.keys(this.value)
      const seriesData = Object.values(this.value)
      const option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }
      const dom = echarts.init(this.$refs.dom, 'tdTheme')
      dom.setOption(option)
    })
  }
}
</script>

<style lang="less">
.charts {
  //
}
</style>
