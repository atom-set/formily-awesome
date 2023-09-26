/**
 * @description Observer 类似于 Vue 的响应式 Slot，它接收一个 Function RenderProps
 * @description 只要在 Function 内部消费到的任何响应式数据，都会随数据变化而自动重新渲染，也更容易实现局部精确渲染
 */
import React from 'react'
import { observable } from '@formily/reactive'
import { Observer } from '@formily/reactive-react'

const obs = observable({
  value: 'Hello world',
})

const DemoPage =  () => {
  return (
    <div>
      <div>
        <Observer>
          {() => (
            <input
              style={{
                height: 28,
                padding: '0 8px',
                border: '2px solid #888',
                borderRadius: 3,
              }}
              value={obs.value}
              onChange={(e) => {
                obs.value = e.target.value
              }}
            />
          )}
        </Observer>
      </div>
      <Observer>{() => <div>{obs.value}</div>}</Observer>
    </div>
  )
}

export default DemoPage;