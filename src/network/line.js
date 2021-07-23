// CropGrowthTrend

import { request } from "@/utils/request"

// 柱状图
const line1 = () => {
  return request({
    url: '/api/CropGrowthTrend'
  })
}

// 导出
export { line1 }

