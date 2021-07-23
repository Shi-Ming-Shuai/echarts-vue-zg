<template>
  <div class="Pie1" ref="Pie1">
    饼形图
  </div>
</template>

<script>
// 导入 echarts
import * as echarts from "echarts"
// 网路请求
import { pie1 } from "@/network/pie"
import { debounce } from "@/utils/debounce"

export default {
  name: "Pie1",
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
      this.myChart = echarts.init(this.$refs.Pie1)
      // 绘制图表 配置项
      let option = {
        title: {
          text: "各地区农作物种植区域占比",
          textStyle: {
            fontSize: 30,
          },
          top: "2%",
          left: "2%",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}:  ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10]
          },
        },
        legend: {
          top: "90%",
          itemWidth: 10,
          itemHeight: 10,
          // data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            center: ["10%", "42%"],
            radius: ["40%", "60%"],
            label: { show: true, position: "inside" },
            labelLine: { show: false },
            data: [
              { value: 1, name: "0岁以下" },
              { value: 4, name: "20-29岁" },
              { value: 2, name: "30-39岁" },
              { value: 2, name: "40-49岁" },
              { value: 1, name: "50岁以上" },
            ],
          },
        ],
      }
      // 设置配置项
      this.myChart.setOption(option)
    },
    // 获取图表 数据 修改option配置数据
    async getData() {
      const res = await pie1()
      console.log(res)

      // series数据 收入
      // 圆心位置  这个决定将这个饼形图放在哪里
      const centerArr = [
        ["10%", "42%"],
        ["35%", "42%"],
        ["65%", "42%"],
        ["90%", "42%"],
      ]

      const seriesData = res.map((item, i) => {
        return {
          name: item.areas + "地区",
          type: "pie",
          center: centerArr[i], // 圆心位置
          radius: ["40%", "60%"],
          label: { show: true, position: "inside" },
          labelLine: { show: false },
          data: [
            { value: item.zb, name: item.areas },
            { value: item.other, name: item.areas + "郊区" },
          ],
        }
      })
      console.log(seriesData)
      // 重新设置 图标数据
      this.setChart(seriesData)
    },
    // 设置 图标数据
    setChart(seriesData) {
      // 覆盖原先已有的配置选项
      let option = {
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
.Pie1 {
  width: 100%;
  height: 100%;
  background-color: rgb(109, 106, 106);
}
</style>
