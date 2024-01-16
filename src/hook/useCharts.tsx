/*
 * @Author: 陈庆贤
 * @Date: 2023-11-15 14:58:00
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-20 10:09:13
 * @Description:
 */
import * as echarts from 'echarts'
import { useEffect, useRef, useState, LegacyRef, RefObject } from 'react'
// : [LegacyRef<HTMLDivElement>, echarts.EChartsType | undefined]
// React.RefObject<HTMLDivElement> | echarts.ECharts | undefined
export const useCharts = (): [RefObject<HTMLDivElement>, echarts.ECharts | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()
  useEffect(() => {
    const chart = echarts.init(chartRef.current as HTMLElement)
    setChartInstance(chart)
  }, [])
  return [chartRef, chartInstance]
}
