<template>
  <div class="Bar2" ref="Bar2">
    柱状图1
  </div>
</template>

<script>
// 导入 echarts
import * as echarts from "echarts"
// 网路请求
import { bar2 } from "@/network/bar"
import { debounce } from "@/utils/debounce"

export default {
  name: "Bar2",
  data() {
    return {
      myChart: null, // echarts 实例
      nowClientWidth: null, // 当前浏览器视口宽度
    }
  },
  components: {},
  // 组件挂载完成 初始化Echarts
  mounted() {
    // 初始化图表  获取数据
    this.initChart()
    this.getData()
    // 图表适配  浏览器变化触发
    this.screenAdapter()
    // console.log(this.nowClientWidth)
  },
  destroyed() {
    // 删除事件监听
    window.onresize = null
  },
  methods: {
    // nowSize 屏幕大小发生改变 适配 文字大小
    nowSize(sizi, initWidth = 1920) {
      // 字体大小 *  (当前屏幕宽度 / 设计稿宽度)
      console.log(sizi * (this.nowClientWidth / initWidth))
      return sizi * (this.nowClientWidth / initWidth)
    },
    // 初始化图表 数据
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.Bar2)
      // 绘制图表 配置项
      let option = {
        title: {
          text: "全国种植收成情况",
          top: "3%",
          left: "5%",
          textStyle: {
            color: "#fff",
            fontSize: 30,
          },
        },
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "5%",
          top: "15%",
          right: "5%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "旅游行业",
              "教育培训",
              "游戏行业",
              "医疗行业",
              "电商行业",
              "社交行业",
              "金融行业",
            ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            axisLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                // width: 1,
                // type: "solid"
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "50%",
            label: {
              show: true,
              position: "top",
            },
            data: [200, 300, 300, 900, 1500, 1200, 600],
            itemStyle: {
              borderRadius: [25, 25, 0, 0],
            },
          },
        ],
      }
      // 设置配置项
      this.myChart.setOption(option)
    },
    // 获取图表 数据 修改option配置数据
    async getData() {
      const res = await bar2()
      // 根据种植面积大小进行排序
      res.sort((a, b) => {
        // area 是面积
        return a.area - b.area
      })
      // x轴数据
      const xData = res.map((item) => {
        return item.month
      })
      // series数据 收入
      const seriesData = res.map((item) => {
        return item.harvest
      })
      // 重新设置 图标数据
      this.setChart(xData, seriesData)
    },
    // 设置 图标数据
    setChart(xData, seriesData) {
      // 覆盖原先已有的配置选项
      let option = {
        // Y轴数据
        xAxis: {
          data: xData,
        },
        // series 数据
        series: {
          data: seriesData,
        },
      }
      // 设置配置项
      this.myChart.setOption(option)
    },
    // 适配 文字大小和 图表大小
    screenAdapter() {
      // 添加初始化屏幕大小
      this.nowClientWidth = document.body.clientWidth
      // 防抖--- 屏幕大小发生改变 记录当前屏幕 进行适配
      window.onresize = debounce(() => {
        this.nowClientWidth = document.body.clientWidth
        // 字体 | 宽度大小适配
        let option = {
          title: {
            textStyle: {
              fontSize: this.nowSize(30),
            },
          },
        }
        this.myChart.setOption(option)
        // 图表适配
        this.myChart.resize()
      }, 50)
    },
  },
}
</script>

<style lang="less" scoped>
.Bar2 {
  width: 100%;
  height: 100%;
  background-color: rgb(109, 106, 106);
}
</style>
