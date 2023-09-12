import React from 'react'
import { FormItem, Space, NumberPicker } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field, FormConsumer } from '@formily/react'

const form = createForm()

const DemoPage = () => {
  console.log('form:', form)
  return (
    <FormProvider form={form}>
      <Space>
        <Field
          name="price"
          title="价格"
          initialValue={5.2}
          decorator={[FormItem]}
          component={[
            NumberPicker,
            {
              placeholder: '请输入价格',
              style: {
                width: 100,
              },
            },
          ]}
        />
        <FormItem>×</FormItem>
        <Field
          name="count"
          title="数量"
          initialValue={100}
          decorator={[FormItem]}
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

        <Field
          name="test"
          title="test"
          initialValue={100}
          component={[NumberPicker]}
        />
        <FormConsumer>
          {(form) => (
            <FormItem>={` ${form.values.price * form.values.count} 元`}</FormItem>
          )}
        </FormConsumer>
      </Space>
    </FormProvider>
  )
}

export default DemoPage;