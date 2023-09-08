import React, { useState, useEffect } from 'react'
import { createForm, onFieldValidateSuccess, onFormSubmitSuccess } from '@formily/core'
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
  Radio,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd'
import { getIdCardInfo } from '../../utils/index';
import moment from 'moment';
import { message } from 'antd';

export default () => {

  const form = createForm({
    validateFirst: true,
    effects() {
      // 监听身份证号
      onFieldValidateSuccess('idCard', (field: any) => {
        if (field.value) {
          const { sex, birthday } = getIdCardInfo(field.value);
          form.setFieldState("sex", (state: any) => {
            state.value = sex
          })
          form.setFieldState("birthday", (state: any) => {
            state.value = moment(birthday, "YYYY-MM-DD")
          })
        }
      })
      // 提交
      onFormSubmitSuccess((field: any) => {
        message.success("提交成功")
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
      ArrayItems,
      Editable,
      Radio
    },
  })

  return (
    <div>
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
          />
          <SchemaField.String
            name="idCard"
            title="身份证号"
            required
            x-validator="idcard"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="sex"
            title="性别"
            x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              {
                label: '男',
                value: '男',
              },
              {
                label: '女',
                value: '女',
              }
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
            name="phone"
            title="手机号"
            required
            x-validator="phone"
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Submit block size="large">
            提交
          </Submit>
        </FormButtonGroup.FormItem>
      </Form>
    </div>
  )
}