import React, { useMemo } from "react"
import { createForm } from "@formily/core"
import { createSchemaField } from "@formily/react"
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from "@formily/antd"
import { Card, Slider, Rate } from "antd"

const Text: React.FC<{
  value?: string
  content?: string
  mode?: "normal" | "h1" | "h2" | "h3" | "p"
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === "normal" || !mode ? "div" : mode
  return React.createElement(tagName, props, value || content)
}

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
    Submit,
  },
})

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const form = useMemo(() => createForm(), [])

  return (
    <Form form={form} labelCol={6} wrapperCol={12}>
      <SchemaField>
        <SchemaField.String
          title="Input"
          x-decorator="FormItem"
          x-component="Input"
          x-validator={[]}
          x-index={0}
          name="i18epdfmm2v"
        />
        <SchemaField.Void
          title=""
          x-component="FormButtonGroup"
          x-decorator="FormItem"
          x-decorator-props={{
            style: {
              display: "flex",
              flexDirection: "column",
              alignContent: "space-around",
              justifyContent: "space-between",
              flexWrap: "wrap",
            },
          }}
          x-index={1}
          name="emunqrq9f9m"
        />
        <SchemaField.Object x-index={2} name="4dw7v9gzjx7">
          <SchemaField.String
            title="Input"
            x-decorator="FormItem"
            x-component="Input"
            x-validator={[]}
            x-index={0}
            name="d2a2h2xcz1v"
          />
          <SchemaField.Markup
            title="Select"
            x-decorator="FormItem"
            x-component="Select"
            x-validator={[]}
            x-index={1}
            name="ub7djxueexs"
          />
        </SchemaField.Object>
        <SchemaField.Object x-index={3} name="4dw7v91gzjx7">
          <SchemaField.Void
            x-component="Submit"
            x-validator={[]}
            x-component-props={{
              children: '提交',
              onSubmit: () => {
                console.log(111)
              }
            }}
            x-index={10}
            name="d2a2h2xcz1v"
          />
          <SchemaField.Void
            x-component="Reset"
            x-validator={[]}
            x-component-props={{
              children: '重置',
              onSubmit: () => {
                console.log(111)
              }
            }}
            x-index={20}
            name="d2a2h2xcz2v"
          />
        </SchemaField.Object>
      </SchemaField>
    </Form>
  )
}
