/* eslint-disable no-eval */
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { createForm, onFormMount, onFormInit, onFieldReact, onFieldValueChange } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const a1 = () => {
  onFormInit((form) => {
    console.log('表单已加载1', form)
  })
}

const a3 = {
  'onFormMount': "(form2) => {\n console.log('表单已加载3', form2) \n}"
}

const form = createForm({
  validateFirst: true,
  effects(form2) {
    a1()
    // onFormMount((form2) => {
    //   eval("(" + a3['onFormMount'] + ")")(form2)
    // })
  }
})


const IDUpload = (props) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  )
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    IDUpload,
    ArrayItems,
    Editable,
  },
})

const scope = {
  fetchAddress: (field) => {
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
      .then(
        action.bound((data) => {
          field.dataSource = transform(data)
          field.loading = false
        })
      )
  },
}

form.setEffects(() => {
  onFormMount((form2) => {
    eval("(" + a3['onFormMount'] + ")")(form2)
  })
})

const schema = {
  type: 'object',
  properties: {
    "source": {
      "type": "string",
      "x-component": "Input",
      "x-reactions": {
        "target": "target",
        "effects": ["onFieldInputValueChange"],
        "fulfill": {
          "state": {
            "visible": "{{$self.value === '123'}}" //任意层次属性都支持表达式
          }
        }
      }
    },
    "target": {
      "type": "string",
      "x-component": "Input"
    },
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'FormGrid',
      properties: {
        firstName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '姓',
          },
        },
        lastName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '名',
          },
        },
      },
    },
    email: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '第三性别',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      required: true,
      title: '生日',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    address: {
      type: 'string',
      required: true,
      title: '地址',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-reactions': '{{fetchAddress}}',
    },
    idCard: {
      type: 'string',
      required: true,
      title: '身份证复印件',
      'x-decorator': 'FormItem',
      'x-component': 'IDUpload',
    },
    contacts: {
      type: 'array',
      required: true,
      title: '联系人信息',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        'x-component': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          popover: {
            type: 'void',
            title: '完善联系人信息',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                fulfill: {
                  schema: {
                    title: '{{$self.query(".name").value() }}',
                  },
                },
              },
            ],
            properties: {
              name: {
                type: 'string',
                title: '姓名',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              email: {
                type: 'string',
                title: '邮箱',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'email'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              phone: {
                type: 'string',
                title: '手机号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'phone'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '新增联系人',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}

const PageDemo = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log(form)
    setLoading(false)
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="编辑用户22" style={{ width: 620 }}>
        <Spin spinning={loading}>
          <Form
            form={form}
            Effect
            title="form"
            labelCol={5}
            wrapperCol={16}
            onAutoSubmit={console.log}
            x-requestSource={[
              {
                key: "16gqb4pkmwj",
                title: "数据源名称",
                duplicateKey: "16gqb4pkmwj",
                config: {
                  name: "AAAA",
                  path: "https://mock.com/api/xxxx",
                  method: "POST",
                  requestParam: [],
                  requestBody: [],
                  requestHeader: [],
                },
              },
            ]}
            onSubmit={() => console.log(form.values)}
          >
            <SchemaField schema={schema} scope={scope} />
            <FormButtonGroup.FormItem>
              <Submit block size="large">
                提交
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}

export default PageDemo;