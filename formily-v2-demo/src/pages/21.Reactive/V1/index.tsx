/**
 * @description observable: 用于创建不同响应式行为的 observable 对象，同时可以作为 annotation 给 define 用于标记响应式属性
 */
import React from 'react'
import { observable, autorun } from '@formily/reactive'

// demo1: 创建深度劫持响应式对象
const obs = observable({
  aa: 11,
})

// 接收一个 tracker 函数，如果函数内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行
autorun(() => {
  console.log(obs.aa)
})

obs.aa = 321

const DemoPage = () => {
  return (
    <div>面向DDD的响应式状态管理方案: observable</div>
  )
}

export default DemoPage;