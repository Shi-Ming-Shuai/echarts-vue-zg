import { request } from "@/utils/request"
// 柱状图
// 各地区种植面积统计TOP10
const pie1 = () => {
  return request({
    url: '/api/cropAreasProportion'
  })
}
// 全国种植收成情况
const pie2 = () => {
  return request({
    url: '/api/plantingHarvest'
  })
}
// 导出
export { pie1, pie2 }

