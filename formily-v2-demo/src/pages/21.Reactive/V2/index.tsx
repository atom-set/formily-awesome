/**
 * @description batch 定义批量操作，内部可以收集依赖
 */
import React from 'react'
import { observable, autorun, batch } from '@formily/reactive'

debugger
const obs = observable({
  aa: 1,
  bb: 2,
  cc: 3,
  dd: 4
})

autorun(() => {
  console.log(obs.aa, obs.bb, obs.cc, obs.dd)
})


batch(() => {
  // batch?.scope(() => {
  //   obs.aa = 11
  // })
  // batch?.scope(() => {
  //   obs.cc = 33
  // })
  // obs.bb = 33
  // obs.dd = 44
})


const DemoPage = () => {
  return (
    <div>
      <h3> observable/observable.deep: 创建深度劫持响应式对象</h3>
      <h3>batch: 定义批量操作，内部可以收集依赖</h3>
    </div>
  )
}

export default DemoPage;