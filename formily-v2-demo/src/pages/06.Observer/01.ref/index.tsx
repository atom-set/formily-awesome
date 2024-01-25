import React, { useLayoutEffect, useRef } from 'react'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const obs = observable({
  value: 'Hello world',
})

let ref: any;

const Fun = () => {
  ref = useRef<any>({})

  useLayoutEffect(() => {
    console.log(ref)
  }, [])
  return (
    <div>
      <div>
        <input
          style={{
            height: 28,
            padding: '0 8px',
            border: '2px solid #888',
            borderRadius: 3,
          }}
          ref={ref}
          value={obs.value}
          onChange={(e) => {
            obs.value = e.target.value
          }}
        />
      </div>
      <div>{obs.value}</div>
    </div>
  )
}

const ObserverRef = observer(Fun, {
  forwardRef: true,
  scheduler: (updater: () => void) => {
    console.log(1111, updater);
    console.log('ref:', ref.current.value)
    updater()
  }
})

export default ObserverRef;