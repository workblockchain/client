// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import ReactECharts from "echarts-for-react"

interface Props {
  title: string
  xAxis: string[]
  series: Series[]
  height?: string
  type?: "line" | "funnel"
}

interface Series {
  name: string
  data: number[]
}

export const LineChart = ({
  title,
  xAxis,
  series,
  height = "400px",
  type = "line",
}: Props) => {
  const defaultSeries = {
    type: type,
    stack: "总量",
    areaStyle: {normal: {}},
  }

  const finalSeries = series.map((i) => ({
    ...defaultSeries,
    ...i,
  }))

  const autoLegend = series.map((item) => item.name)

  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: autoLegend,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xAxis,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: finalSeries,
  }
  return (
    <>
      <ReactECharts option={option} style={{height: height}} />
    </>
  )
}
