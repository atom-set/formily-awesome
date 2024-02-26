//@ts-nocheck
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
  FormButtonGroup,
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
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
  scope: {
    fetchAddress: (field: any) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === 'string')
            return buf.concat({
              label: value,
              value: key,
            })
          const { name, code, cities, districts } = value
          const _cities = transform(cities)
          const _districts = transform(districts)
          return buf.concat({
            label: name,
            value: code,
            children: _cities.length
              ? _cities
              : _districts.length
                ? _districts
                : undefined,
          })
        }, [])
      }

      field.loading = true
      fetch('//unpkg.com/china-location/dist/location.json')
        .then((res) => res.json())
        .then((data) => {
          field.dataSource = transform(data)
          field.loading = false
        })
    }
  }
})

const DemoPage = () => {
  const form = useMemo(() => createForm(), [])


  return (
    <Form
      form={form}
      labelCol={6}
      wrapperCol={12}
    >
      <SchemaField>
        <SchemaField.String
          title="Input"
          x-decorator="FormItem"
          x-component="Input"
          x-validator={[]}
          x-index={0}
          x-reactions={{
            dependencies: [{ property: "value", type: "any" }],
            fulfill: { run: "" },
          }}
          name="64ksk8l9wrx"
        />
        <SchemaField.Markup
          title="Cascader"
          x-decorator="FormItem"
          x-component="Cascader"
          x-validator={[]}
          x-index={1}
          x-reactions="{{fetchAddress}}"
          name="91r9orbuec8"
        />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
export default DemoPage;