<template>
  <div class="charts chart-pie" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'IChartPie',
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  mounted () {
    this.$nextTick(() => {
      const legend = this.value.map(_ => _.name)
      const option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legend
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.value,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
