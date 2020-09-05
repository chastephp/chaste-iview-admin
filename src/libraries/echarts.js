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
