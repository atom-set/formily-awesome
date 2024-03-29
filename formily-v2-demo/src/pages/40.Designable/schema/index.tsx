/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import {
  createForm,
  onFormInit,
  onFormMount,
  onFormUnmount,
  onFormValuesChange,
  onFormInitialValuesChange,
  onFormInputChange,
  onFormSubmit,
  onFormReset,
  onFormSubmitStart,
  onFormSubmitEnd,
  onFormSubmitSuccess,
  onFormSubmitFailed,
  onFormSubmitValidateStart,
  onFormSubmitValidateSuccess,
  onFormSubmitValidateFailed,
  onFormSubmitValidateEnd,
  onFormValidateStart,
  onFormValidateSuccess,
  onFormValidateFailed,
  onFormValidateEnd,
  onFormGraphChange,
  onFormLoading,
  onFormReact,
  onFieldInit,
  onFieldMount,
  onFieldUnmount,
  onFieldValueChange,
  onFieldInitialValueChange,
  onFieldInputValueChange,
  onFieldValidateStart,
  onFieldValidateEnd,
  onFieldValidating,
  onFieldValidateFailed,
  onFieldValidateSuccess,
  onFieldSubmit,
  onFieldSubmitStart,
  onFieldSubmitEnd,
  onFieldSubmitValidateStart,
  onFieldSubmitValidateEnd,
  onFieldSubmitSuccess,
  onFieldSubmitFailed,
  onFieldSubmitValidateSuccess,
  onFieldSubmitValidateFailed,
  onFieldReset,
  onFieldLoading,
  onFieldReact,
  onFieldChange,
} from '@formily/core'
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

const IDUpload = (props: any) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined rev={undefined} />}>上传复印件</Button>
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

const schema = {
  type: 'object',
  properties: {
    username: {
      name: "username",
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
          name: "firstName",
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

const effectHooks = {
  onFormInit,
  onFormMount,
  onFormUnmount,
  onFormValuesChange,
  onFormInitialValuesChange,
  onFormInputChange,
  onFormSubmit,
  onFormReset,
  onFormSubmitStart,
  onFormSubmitEnd,
  onFormSubmitSuccess,
  onFormSubmitFailed,
  onFormSubmitValidateStart,
  onFormSubmitValidateSuccess,
  onFormSubmitValidateFailed,
  onFormSubmitValidateEnd,
  onFormValidateStart,
  onFormValidateSuccess,
  onFormValidateFailed,
  onFormValidateEnd,
  onFormGraphChange,
  onFormLoading,
  onFormReact,
  onFieldInit,
  onFieldMount,
  onFieldUnmount,
  onFieldValueChange,
  onFieldInitialValueChange,
  onFieldInputValueChange,
  onFieldValidateStart,
  onFieldValidateEnd,
  onFieldValidating,
  onFieldValidateFailed,
  onFieldValidateSuccess,
  onFieldSubmit,
  onFieldSubmitStart,
  onFieldSubmitEnd,
  onFieldSubmitValidateStart,
  onFieldSubmitValidateEnd,
  onFieldSubmitSuccess,
  onFieldSubmitFailed,
  onFieldSubmitValidateSuccess,
  onFieldSubmitValidateFailed,
  onFieldReset,
  onFieldLoading,
  onFieldReact,
  onFieldChange,
}

const scope = {
  fetchAddress: `(field) => {
    field.loading = true
    fetch('https://unpkg.com/china-location/dist/location.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((response) => {
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
        return transform(response)
      })
      .then((data) => {
        console.log('data:', data);
        field.dataSource = data
        field.loading = false
      })
  }`
};

const PageDemo = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log(form)
    setLoading(false)
  }, []);

  const form = useMemo(() => createForm({
    effects() { },
  }), [])

  const formatScope = useMemo(() => {
    let scopeRes: any = {};
    for (let [key, value] of Object.entries(scope)) {
      // console.log(key)
      // console.log(value)
      // eslint-disable-next-line no-new-func
      scopeRes[key] = new Function(`{ return ${value}; } `)()
    }
    // console.log(scopeRes)
    return scopeRes;
  }, []);

  const effect = [
    "onFormMount((form) => {\n  console.log('onFormMount')\n})",
    "onFieldInit('username', (field) => {\n\n console.log('onFieldInit:', field)\n  \n})",
    "onFieldInputValueChange('username', (field) => {\n  console.log('target 值变化：' + field.value)\n})\n\nonFormMount(() => {\n  console.log('onFormMount')\n})\n"
  ]

  form.addEffects(form.id, () => {
    const scope = effectHooks;
    effect.forEach((item) => {
      let expression = `() => {\n ${item} \n}`
      // eslint-disable-next-line no-new-func
      new Function('$root', `with($root) { return ${expression}; }`)(scope)()
    })
  })
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
          >
            <SchemaField schema={schema} scope={formatScope}>
            </SchemaField>
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
