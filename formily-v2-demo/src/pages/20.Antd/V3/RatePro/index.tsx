// import { PreviewText } from '@formily/antd'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Rate as AntdRate } from 'antd'

export const RatePro = connect(
  AntdRate,
  mapProps((props, field) => {
    console.log('props:', props, field)
    return {
      ...props,
    }
  }),
  mapReadPretty(() => (
    <div>NAN</div>
  ))
)