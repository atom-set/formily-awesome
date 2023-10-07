/**
 * @description Formily Schema 形式执行过程
 */
import React from 'react'
import { FormItem, Input, Space } from '@formily/antd'
import { GeneralField, createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const form = createForm()

const DemoPage = () => {
  console.log('form:', form)


  const SchemaField = createSchemaField({
    components: {
      FormItem,
      Input,
    },
    scope: {
      calc: (field: GeneralField) => {
        const dependencies = field.data?.dependencies;
        if (field.form.values[dependencies]) {
          (field as any).setValue(field.form.values[dependencies] * 18)
        }
      }
    },
  })

  return (
    // createContent
    <FormProvider form={form}>
      <Space>
        <SchemaField>
          <SchemaField.String
            name="total"
            title="数量"
            x-value={10}
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={
              {
                placeholder: '请输入数量',
                style: {
                  width: 100,
                },
              }
            }
          />
          <SchemaField.String
            name="amount"
            title="总价"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{
              placeholder: '请输入价格',
              style: {
                width: 300,
              },
              disabled: true,
            }}
            x-reactions={[
              {
                dependencies: ['.total'],
                fulfill: {
                  state: {
                    'value': '{{$deps[0] * 18}}',
                  },
                },
              },
            ]}
          />

          <SchemaField.String
            name="amount2"
            title="总价"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{
              placeholder: '请输入价格',
              style: {
                width: 300,
              },
              disabled: true,
            }}
            x-reactions="{{calc}}"
            x-data={{ dependencies: 'total' }}
          />
        </SchemaField>
      </Space>
    </FormProvider>
  )
}

export default DemoPage;