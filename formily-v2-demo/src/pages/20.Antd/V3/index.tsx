/**
 * @description 自定义组件
 */
import React from 'react'
import { FormItem, Space } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { RatePro } from './RatePro'

const form = createForm({
  effects: () => {
  }
})

const DemoPage = () => {
  console.log('form:', form)

  return (
    // createContent
    <FormProvider form={form}>
      <Space>
        <Field
          name="rate"
          title="得分"
          initialValue={10}
          decorator={[FormItem]}
          component={[
            RatePro,
            {
              style: {
                width: 300,
              },
            },
          ]}
        />
      </Space>
    </FormProvider>
  )
}

export default DemoPage;