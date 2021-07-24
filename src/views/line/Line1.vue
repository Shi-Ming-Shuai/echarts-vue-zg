<template>
  <div class="Line1" ref="Line1">
    柱状图1
  </div>
</template>

<script>
// 导入 echarts
import * as echarts from "echarts"
// 网路请求
import { line1 } from "@/network/line"
import { debounce } from "@/utils/debounce"
import { socketMessage } from "@/network/socketIo"

export default {
  name: "Line1",
  data() {
    return {
      myChart: null, // echarts 实例
      nowClientWidth: null, // 当前浏览器视口宽度
    }
  },
  // 主题颜色
  props: {
    echartsTheme: {
      type: String,
      default: "dark",
    },
  },
  // 监听主题颜色变化
  watch: {
    echartsTheme: {
      handler() {
        // 清除上一次图表实例
        this.myChart.dispose()
        // 初始化图表  获取数据
        this.initChart()
        this.getData()
        // // 图表适配  浏览器变化触发
        this.screenAdapter()
      },
    },
  },
  components: {},
  // 组件挂载完成 初始化Echarts
  mounted() {
    // 初始化图表  获取数据
    this.initChart()
    this.getData()
    // 图表适配  浏览器变化触发
    this.screenAdapter()
  },
  destroyed() {
    // 删除事件监听
    window.onresize = null
  },
  methods: {
    // nowSize 屏幕大小发生改变 适配 文字大小
    nowSize(sizi, initWidth = 1920) {
      // 字体大小 *  (当前屏幕宽度 / 设计稿宽度)
      return sizi * (this.nowClientWidth / initWidth)
    },
    // 初始化图表 数据
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.Line1, this.echartsTheme)
      // 绘制图表 配置项
      // 2. 指定配置和数据
      var option = {
        title: {
          top: "5%",
          left: "3%",
          text: "主要地区农作物种植增长趋势",
          textStyle: {
            fontSize: 30,
          },
        },
        color: ["#6095b0", "#7edfe0", "#f0da91", "#f1af96"],
        tooltip: {
          // 通过坐标轴来触发
          trigger: "axis",
        },
        legend: {
          top: "5%",
          // 距离容器10%
          right: "10%",
          // 修饰图例文字的颜色
          textStyle: {
            color: "#4c9bfd",
          },
          // 如果series 里面设置了name，此时图例组件的data可以省略
          // data: ["邮件营销", "联盟广告"]
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          show: true,
          borderColor: "#012f4a",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          // 去除刻度
          axisTick: {
            show: false,
          },
          // 修饰刻度标签的颜色
          axisLabel: {
            color: "rgba(255,255,255,.7)",
          },
          // 去除x坐标轴的颜色
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          // 去除刻度
          axisTick: {
            show: false,
          },
          // 修饰刻度标签的颜色
          axisLabel: {
            color: "rgba(255,255,255,.7)",
          },
          // 修改y轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: "#012f4a",
            },
          },
        },
        series: [
          {
            name: "新增粉丝",
            type: "line",
            // stack: "总量",
            // 是否让线条圆滑显示
            smooth: true,
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          },
          {
            name: "新增游客",
            type: "line",
            // stack: "总量",
            smooth: true,
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
          },
        ],
      }
      // 设置配置项
      this.myChart.setOption(option)
    },
    // 获取图表 数据 修改option配置数据
    async getData() {
      const res = await socketMessage("CropGrowthTrend")
      // X轴数据
      const xData = res[0].content.map((item) => {
        return item.month
      })
      // series数据 面积
      const seriesData = res.map((item) => {
        let areaArr = item.content.map((child) => {
          return child.area
        })
        return {
          name: item.city,
          type: "line",
          // stack: "总量",
          smooth: true,
          data: areaArr,
        }
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
        series: seriesData,
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
.Line1 {
  width: 100%;
  height: 100%;
}
</style>
