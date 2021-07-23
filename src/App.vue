<template>
  <div id="app">
    <!-- <Bar1 /> -->
    <!-- <Bar2 /> -->
    <!-- <Pie1 /> -->
    <!-- <Line1 /> -->
    <!-- 模拟的数据 可以请求到自己public中的json数据 不需要展示 -->
    <!-- <Map /> -->
    <el-row>
      <el-col class="header" :span="24">
        <header>Echarts-各地区种植面积统计</header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :lg="12" :xl="24">
        <Bar1 />
      </el-col>
      <el-col :xs="24" :lg="12" :xl="8">
        <Bar2 />
      </el-col>
      <el-col :xs="24" :lg="16" :xl="14">
        <Pie1 />
      </el-col>
      <el-col :xs="24" :lg="8" :xl="24">
        <Line1 />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 柱状图
import Bar1 from "@/views/bar/Bar1"
import Bar2 from "@/views/bar/Bar2"
// 饼形图
import Pie1 from "@/views/pie/Pie1"
// 中国地图
import Map from "@/views/map/Map"
// 折线图
import Line1 from "@/views/line/Line1"

export default {
  name: "App",
  components: {
    Bar1,
    Bar2,
    Pie1,
    Map,
    Line1,
  },
}
</script>

<style lang="less">
body,
html,
#app {
  margin: 0;
  height: 100%;
  background-color: rgb(109, 106, 106);
}
.el-col {
  border: 1px solid #fff;
  height: 300px;
}
.header {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 55px;
  color: #fff;
}
</style>
