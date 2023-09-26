/**
 * @description Formily JSX 形式执行过程
 */
import React from 'react'
import { FormItem, Input, Space } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

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
          name="total"
          title="数量"
          initialValue={10}
          decorator={[FormItem]}
          component={[
            Input,
            {
              placeholder: '请输入数量',
              style: {
                width: 100,
              },
            },
          ]}
        />
        <Field
          name="amount"
          title="总价"
          disabled
          initialValue={180}
          decorator={[FormItem]}
          reactions={[(field) => {
            const total = field.query('total')
            field.value = total.get("value") * 18
          }]}
          component={[
            Input,
            {
              placeholder: '请输入价格',
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