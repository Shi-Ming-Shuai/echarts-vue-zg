import { request } from "@/utils/request"
// 柱状图
// 各地区种植面积统计TOP10
const bar1 = () => {
  return request({
    url: '/api/plantingAreaTop'
  })
}
// 全国种植收成情况
const bar2 = () => {
  return request({
    url: '/api/plantingHarvest'
  })
}


// 导出
export { bar1, bar2 }

