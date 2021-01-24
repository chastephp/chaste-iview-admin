import echarts from 'echarts'

export const Line = {
  makeBasicOption: ({ data, xKey, yKey, title }) => {
    const xAxis = []
    const series = []
    for (const i in data) {
      xAxis.push(data[i][xKey])
      series.push(data[i][yKey])
    }

    return {
      title: title,
      xAxis: {
        type: 'category',
        data: xAxis
      },
      tooltip: {
        trigger: 'axis'
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: series,
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }]
    }
  }
}

export const Bar = {
  makeBasicOption: ({ data, xKey, yKey, title }) => {
    const xAxis = []
    const series = []
    for (const i in data) {
      xAxis.push(data[i][xKey])
      series.push(data[i][yKey])
    }

    return {
      title: title,
      xAxis: {
        type: 'category',
        data: xAxis
      },
      tooltip: {
        trigger: 'axis'
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: series,
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ]
          )
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ]
            )
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }]
    }
  }
}

export const Pie = {
  makeBasicOption: ({ data, nameKey, valueKey, title }) => {
    data.forEach(item => {
      item.name = item[nameKey]
      item.value = item[valueKey]
    })

    return {
      title: title,
      legend: {
        formatter: '{name}',
        orient: 'vertical',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        data: data,
        type: 'pie',
        radius: '50%',
        label: {
          formatter: '{b}  {c}  {d}%  '
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
  }
}
