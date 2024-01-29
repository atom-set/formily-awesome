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
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
})

const DemoPage = () => {
  const form = useMemo(() => createForm(), [])

  return (
    <Form
      form={form}
      labelCol={6}
      wrapperCol={12}
      style={{
        padding: "-1px 0px 0px 0px",
        borderTopStyle: "solid",
        borderTopWidth: "0px",
      }}
    >
      <SchemaField>
        <SchemaField.Void x-component="FormTab" x-index={0} name="hgi4ewbppjg">
          <SchemaField.Void
            x-component="FormTab.TabPane"
            x-component-props={{ tab: "Unnamed Title", key: "ggfpmqp45ft" }}
            x-index={0}
            name="2cqb358wy4j"
          >
            <SchemaField.Markup
              title="Checkbox Group"
              x-decorator="FormItem"
              x-component="Checkbox.Group"
              enum={[
                { label: "选项1", value: 1 },
                { label: "选项2", value: 2 },
              ]}
              x-validator={[]}
              x-index={0}
              name="s3bnx8x9awi"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormTab.TabPane"
            x-component-props={{ tab: "Unnamed Title", key: "sjat2lhot3o" }}
            x-index={1}
            name="qnoiib1bwwz"
          >
            <SchemaField.String
              title="TimePicker"
              x-decorator="FormItem"
              x-component="TimePicker"
              x-validator={[]}
              x-index={0}
              name="b164hbernzr"
            />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  )
}

export default DemoPage;