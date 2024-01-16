/*
 * @Author: 陈庆贤
 * @Date: 2023-11-14 10:41:01
 * @email: alvin9504@163.com
 * @LastEditors: 陈庆贤
 * @LastEditTime: 2023-11-16 10:02:37
 * @Description:
 */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import useStore from '@/store/zustand'
import { formatState } from '@/utils'
import { getReportData, getLineData, getPieCityData, getPieAgeData, getRadarData } from '@/api/api'
import { DashboardType } from '@/types/api'
import { formatNum } from '@/utils'
import { useCharts } from '@/hook/useCharts'
const Dashboard: React.FC = () => {
  // 获取用户信息
  const userInfo = useStore(state => state.userInfo)
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户id',
      children: userInfo._id
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo.userEmail
    },
    {
      key: '3',
      label: '状态',
      children: formatState(userInfo.state as number)
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo.mobile
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo.job
    },
    {
      key: '6',
      label: '部门',
      children: userInfo.deptName
    }
  ]
  // 报表数据
  const [report, setReport] = useState<DashboardType.ReportData>()

  // 初始化折线图
  const [lineRef, setLineChart] = useCharts()
  // 初始化饼图
  const [pieChartCityRef, setPieChartCity] = useCharts()
  const [pieChartAgeRef, setPieChartAge] = useCharts()
  // 初始化雷达图
  const [radarChartRef, setRadarChart] = useCharts()
  useEffect(() => {
    // 折线图
    // const lineChartDom = document.getElementById('lineChart') as HTMLElement
    // const chartInstance = echarts.init(lineChartDom)
    // chartInstance.setOption({
    //   // title: {
    //   //   text: '订单和流水走势图'
    //   // },
    //   tooltip: {
    //     trigger: 'axis'
    //   },

    //   grid: {
    //     left: '3%',
    //     right: 50,
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       name: '订单',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: '流水',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [220, 182, 191, 234, 290, 330, 310]
    //     }
    //   ]
    // })

    // 饼图
    // const pieChartCityDom = document.getElementById('pieChartCity') as HTMLElement
    // const chartCityDom = echarts.init(pieChartCityDom)
    // chartCityDom.setOption({
    //   tooltip: {
    //     trigger: 'item'
    //   },
    //   legend: {
    //     top: '5%',
    //     left: 'center'
    //   },
    //   series: [
    //     {
    //       name: '城市分布',
    //       type: 'pie',
    //       radius: '50%',
    //       avoidLabelOverlap: false,
    //       // itemStyle: {
    //       //   borderRadius: 10,
    //       //   borderColor: '#fff',
    //       //   borderWidth: 2
    //       // },
    //       // label: {
    //       //   show: false,
    //       //   position: 'center'
    //       // },
    //       emphasis: {
    //         label: {
    //           show: true,
    //           fontSize: 20,
    //           fontWeight: 'bold'
    //         }
    //       },
    //       labelLine: {
    //         show: true
    //       },
    //       data: [
    //         { value: 1048, name: '北京' },
    //         { value: 735, name: '上海' },
    //         { value: 580, name: '广州' },
    //         { value: 484, name: '深圳' },
    //         { value: 300, name: '杭州' }
    //       ]
    //     }
    //   ]
    // })

    // 饼图
    // const pieChartAgeDom = document.getElementById('pieChartAge') as HTMLElement
    // const chartAgeDom = echarts.init(pieChartAgeDom)
    // chartAgeDom.setOption({
    //   tooltip: {
    //     trigger: 'item'
    //   },
    //   legend: {
    //     top: '5%',
    //     left: 'center'
    //   },
    //   series: [
    //     {
    //       name: '城市分布',
    //       type: 'pie',
    //       radius: '50%',
    //       avoidLabelOverlap: false,
    //       // itemStyle: {
    //       //   borderRadius: 10,
    //       //   borderColor: '#fff',
    //       //   borderWidth: 2
    //       // },
    //       // label: {
    //       //   show: false,
    //       //   position: 'center'
    //       // },
    //       emphasis: {
    //         label: {
    //           show: true,
    //           fontSize: 20,
    //           fontWeight: 'bold'
    //         }
    //       },
    //       labelLine: {
    //         show: true
    //       },
    //       data: [
    //         { value: 1048, name: '北京' },
    //         { value: 735, name: '上海' },
    //         { value: 580, name: '广州' },
    //         { value: 484, name: '深圳' },
    //         { value: 300, name: '杭州' }
    //       ]
    //     }
    //   ]
    // })

    // 雷达图
    // const radarChartAgeDom = document.getElementById('radarChart') as HTMLElement
    // const chartRadarDom = echarts.init(radarChartAgeDom)
    // chartRadarDom.setOption({
    //   // backgroundColor: '#161627',
    //   // title: {
    //   //   text: '司机模型诊断',
    //   //   left: 'center'
    //   // },
    //   legend: {
    //     data: ['司机模型诊断']
    //   },
    //   radar: {
    //     indicator: [
    //       { name: '服务态度', max: 10 },
    //       { name: '在线时长', max: 600 },
    //       { name: '接单率', max: 100 },
    //       { name: '评分', max: 5 },
    //       { name: '关注度', max: 1000 }
    //     ]
    //   },
    //   series: [
    //     {
    //       name: '服务态度',
    //       type: 'radar',
    //       data: [
    //         {
    //           value: [2, 30, 23, 2, 899],
    //           name: 'Actual Spending'
    //         }
    //       ]
    //     }
    //   ]
    // })

    // 获取报表数据
    getReportDataFc()

    // 获取折线图数据
    getLineDataFc()
    // 获取饼图数据
    getPieCityDataFC()
    getPieAgeDatFC()
    // 获取雷达图
    getRadarDataFc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLineChart, setPieChartCity, setPieChartAge, setRadarChart])
  // 获取报表数据
  const getReportDataFc = async () => {
    const data = await getReportData()
    setReport(data)
  }
  // 获取折线图数据
  const getLineDataFc = async () => {
    const data = await getLineData()
    setLineChart?.setOption({
      // title: {
      //   text: '订单和流水走势图'
      // },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: 50,
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data?.lable
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          stack: 'Total',
          data: data?.order
        },
        {
          name: '流水',
          type: 'line',
          stack: 'Total',
          data: data?.money
        }
      ]
    })
  }
  // 获取饼图数据
  const getPieCityDataFC = async () => {
    const data = await getPieCityData()
    setPieChartCity?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          avoidLabelOverlap: false,
          // itemStyle: {
          //   borderRadius: 10,
          //   borderColor: '#fff',
          //   borderWidth: 2
          // },
          // label: {
          //   show: false,
          //   position: 'center'
          // },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: data
        }
      ]
    })
  }
  // 获取饼图数据
  const getPieAgeDatFC = async () => {
    const data = await getPieAgeData()
    setPieChartAge?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          avoidLabelOverlap: false,
          // itemStyle: {
          //   borderRadius: 10,
          //   borderColor: '#fff',
          //   borderWidth: 2
          // },
          // label: {
          //   show: false,
          //   position: 'center'
          // },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: data
        }
      ]
    })
  }
  // 获取雷达图
  const getRadarDataFc = async () => {
    const data = await getRadarData()

    setRadarChart?.setOption({
      // backgroundColor: '#161627',
      // title: {
      //   text: '司机模型诊断',
      //   left: 'center'
      // },
      legend: {
        data: [(data.data as any)[0].name]
      },
      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: '服务态度',
          type: 'radar',
          data: data.data
        }
      ]
    })
  }
  // 监听窗口改变echarts
  window.onresize = () => {
    setLineChart?.resize()
    setPieChartCity?.resize()
    setPieChartAge?.resize()
    setRadarChart?.resize()
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          className={styles.userImg}
          src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fb4a87154-18b6-4163-ac80-f4dc4bf58d09%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1702523487&t=dd8eb035baeb8d1696c9c5725cf901bf'
          alt=''
        />
        <Descriptions title='欢迎新同学' layout='vertical' items={items} />
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{report?.totalMoney}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{report?.orderCount}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{report?.cityNum}个</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div ref={lineRef} className={styles.itemChart}></div>
          {/* <div id='lineChart' className={styles.itemChart}></div> */}
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div ref={pieChartCityRef} className={styles.itemPie}></div>
            <div ref={pieChartAgeRef} className={styles.itemPie}></div>
            {/* <div id='pieChartCity' className={styles.itemPie}></div>
            <div id='pieChartAge' className={styles.itemPie}></div> */}
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div ref={radarChartRef} className={styles.itemChart}></div>
          {/* <div id='radarChart' className={styles.itemChart}></div> */}
        </Card>
      </div>
    </div>
  )
}
export default Dashboard
