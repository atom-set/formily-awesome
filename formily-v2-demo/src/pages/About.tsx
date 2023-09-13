/* eslint-disable no-eval */
import React from 'react'
import { Field, createForm, onFieldValueChange } from '@formily/core'
import { Schema, createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Password,
  Cascader,
  DatePicker,
  Submit,
  Space,
  FormGrid,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { Card } from 'antd'

const toArr = (val: any): any[] => (Array.isArray(val) ? val : val ? [val] : [])

const trimEnd = (oldVal: string) => oldVal?.trimEnd()

export const trimFun = (field: Field, ...rest: any[]) => {
  const value = field?.value;
  field.value = trimEnd(value)
};

const form = createForm({
  validateFirst: true,
  effects() {
    onFieldValueChange('username', (field) => {
      form.setFieldState(`username`, (state) => {
        // console.log('state:', Object.keys(state), form)
        // state.value = trimEnd(state?.value)
      });
    })
  }
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    Password,
    Space,
    ArrayItems,
    Editable,
  },
  scope: {
    fetchAddress: (field: { loading: boolean; dataSource: any }) => {
    },
    trimFun,
  },
})

Schema.registerPatches(schema => {
  const reactions = toArr(schema['x-reactions'])
  reactions.push((field: Field) => {
    const formatFun = schema['x-format'];
    if (!field.mounted || !field.visible) return
    if (typeof formatFun === 'function') {
      // 这里做一些处理
      field.value = formatFun(field.value)
    }
  })
  console.log('schema:', schema)
  return schema
});


const AboutPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="新用户注册" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField>
            <SchemaField.String
              name="username"
              title="用户名"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-value="121212     "
              x-component-props={{
                style: {
                  background: 'red'
                }
              }}
              x-format={trimEnd}
              x-reactions="{{trimFun}}"
            />
            {/* <SchemaField.String
              name="password"
              title="密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                checkStrength: true,
              }}
              x-reactions={[
                {
                  dependencies: ['.confirm_password'],
                  fulfill: {
                    state: {
                      selfErrors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.String
              name="confirm_password"
              title="确认密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                checkStrength: true,
              }}
              x-reactions={[
                {
                  dependencies: ['.password'],
                  fulfill: {
                    state: {
                      selfErrors:
                        '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                    },
                  },
                },
              ]}
            />
            <SchemaField.Void
              title="姓名"
              x-decorator="FormItem"
              x-decorator-props={{
                asterisk: true,
                feedbackLayout: 'none',
              }}
              x-component="FormGrid"
            >
              <SchemaField.String
                name="firstName"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '姓',
                }}
                required
              />
              <SchemaField.String
                name="lastName"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  placeholder: '名',
                }}
                required
              />
            </SchemaField.Void>
            <SchemaField.String
              name="email"
              title="邮箱"
              required
              x-validator="email"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="gender"
              title="性别"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
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
              ]}
              required
            />
            <SchemaField.String
              name="birthday"
              title="生日"
              required
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="address"
              title="地址"
              required
              x-decorator="FormItem"
              x-component="Cascader"
              x-reactions="{{fetchAddress}}"
            />
            <SchemaField.Array
              name="contacts"
              title="联系人信息"
              required
              x-decorator="FormItem"
              x-component="ArrayItems"
            >
              <SchemaField.Object x-component="ArrayItems.Item">
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayItems.SortHandle"
                />
                <SchemaField.Void
                  name="popover"
                  title="维护联系人信息"
                  x-decorator="Editable.Popover"
                  x-component="FormLayout"
                  x-component-props={{
                    layout: 'vertical',
                  }}
                  x-reactions={[
                    {
                      dependencies: ['.popover.name'],
                      fulfill: {
                        schema: {
                          title: '{{$deps[0]}}',
                        },
                      },
                    },
                  ]}
                >
                  <SchemaField.String
                    name="name"
                    required
                    title="姓名"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{
                      style: {
                        width: 300,
                      },
                    }}
                  />
                  <SchemaField.String
                    name="email"
                    title="邮箱"
                    x-validator={[{ required: true }, 'email']}
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{
                      style: {
                        width: 300,
                      },
                    }}
                  />
                  <SchemaField.String
                    name="phone"
                    required
                    title="手机号"
                    x-validator="phone"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{
                      style: {
                        width: 300,
                      },
                    }}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayItems.Remove"
                />
              </SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayItems.Addition"
                title="新增联系人"
              />
            </SchemaField.Array> */}
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              注册
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  )
}

export default AboutPage;