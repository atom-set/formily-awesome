/**
 * @description 构建antd最小组件间的关系
 */
import React from 'react'
import { FormItem, Space, NumberPicker } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

const DemoPage = () => {
  console.log('form:', form)
  return (
    <FormProvider form={form}>
        <Field
          name="total"
          title="数量"
          initialValue={101}
          // decorator={[FormItem]}
          component={[
            NumberPicker,
            {
              placeholder: '请输入数量',
              style: {
                width: 100,
              },
            },
          ]}
        />
    </FormProvider>
  )
}

export default DemoPage;