import React from 'react'
import { FormItem, Space, NumberPicker } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field, FormConsumer } from '@formily/react'

const form = createForm()

const DemoPage = () => {
  console.log('form:', form)
  const ageProps = {
    name: 'age',
    placeholder: '请输入年龄',
    style: {
      width: 100,
    },
  }
  return (
    <FormProvider form={form}>
      <Space>
        <Field
          name="total"
          title="数量"
          initialValue={10}
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
          name="price"
          title="价格"
          initialValue={52}
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
          reactions={(field) => {
            field.query('.price')
            field.query('.total')
            // console.log('total:', price.value())
          }}
        />
        <FormConsumer>
          {(form) => (
            <FormItem>={` ${form.values.price * form.values.total} 元`}</FormItem>
          )}
        </FormConsumer>
      </Space>
      <br />
      <Space>
        <FormItem label="FormItem 包裹">
          <NumberPicker {...ageProps} />
        </FormItem>
      </Space>
    </FormProvider>
  )
}

export default DemoPage;