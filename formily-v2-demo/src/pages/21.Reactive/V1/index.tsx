/**
 * @description observable: 用于创建不同响应式行为的 observable 对象，同时可以作为 annotation 给 define 用于标记响应式属性
 */
import React from 'react'
import { observable, autorun } from '@formily/reactive'


// observable/observable.deep: 创建深度劫持响应式对象
const obs = observable({
  aa: {
    bb: 11
  },
})

// autorun(() => {
//   console.log(obs.aa.bb)
// })


// 1.get: obs.aa
// 2.set: obs.aa.bb = { cc: 22 }
// @ts-ignore
// obs.aa.bb = {
//   cc: 22
// }

autorun(() => {
  console.log(obs.aa.bb)
})

obs.aa.bb = 22

const DemoPage = () => {
  return (
    <div>
      <h2>observable: 用于创建不同响应式行为的 observable 对象，同时可以作为 annotation 给 define 用于标记响应式属性</h2>
      <h3> observable/observable.deep: 创建深度劫持响应式对象</h3>
    </div>
  )
}

export default DemoPage;