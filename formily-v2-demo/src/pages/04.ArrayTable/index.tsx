import React, { useMemo } from 'react'
import {
  FormItem,
  Input,
  ArrayTable,
  Editable,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm, onFieldValueChange } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button, Alert } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
  },
})


const range = (count: number) =>
  Array.from(new Array(count)).map((_, key) => ({
    aaa: key,
  }))

const ArrayTableDemo = () => {
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldValueChange('array.*.a2', (field) => {
            console.log('field:', field, field.address.entire)
            console.log(form.values)
          })
        },
      }),
    []
  )

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          x-component="ArrayTable"
          x-component-props={{
            pagination: { pageSize: 10 },
            scroll: { x: '100%' },
            onMoveUp: (...args) => {
              console.log(...args)
            },
            onMoveDown: (...args) => {
              console.log(...args)
            }
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 50, title: 'Sort', align: 'center' }}
            >
              <SchemaField.Void
                x-decorator="FormItem"
                required
                x-component="ArrayTable.SortHandle"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: 'Index', align: 'center' }}
            >
              <SchemaField.Void
                x-decorator="FormItem"
                required
                x-component="ArrayTable.Index"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A1', dataIndex: 'a1', width: 200 }}
            >
              <SchemaField.String
                name="a1"
                x-decorator="Editable"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A2', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a2"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A3', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a3"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                title: 'Operations',
                dataIndex: 'operations',
                width: 200,
                fixed: 'right',
              }}
            >
              <SchemaField.Void x-component="FormItem">
                <SchemaField.Void x-component="ArrayTable.Remove" />
                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                <SchemaField.Void x-component="ArrayTable.MoveUp" />
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayTable.Addition"
            title="添加条目"
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
        <Button
          block
          onClick={() => {
            form.setInitialValues({
              array: range(3),
            })
          }}
        >
          加载10W条超大数据
        </Button>
      </FormButtonGroup>
      <Alert
        style={{ marginTop: 10 }}
        message="注意：开启formily插件的页面，因为后台有数据通信，会占用浏览器算力，最好在无痕模式(无formily插件)下测试"
        type="warning"
      />
    </FormProvider >
  )
}

export default ArrayTableDemo;