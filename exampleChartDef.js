function CHART_DEF(data) {
  return {
    xAxis: {
      type: 'category',
      data: data.map(x=>x.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.map(x=>x.value),
        type: 'line'
      }
    ]
  }
}
