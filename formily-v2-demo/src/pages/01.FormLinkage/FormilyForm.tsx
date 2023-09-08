import React, { FC } from 'react';
import { createForm, onFieldInputValueChange } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import {
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import '@formily/antd/dist/antd.css';
import 'antd/dist/reset.css';

const form = createForm({
  initialValues: {
    userName: '张三',
    interest: '跑步',
    welcome: "张三爱跑步",
  },
  effects() {
    onFieldInputValueChange('*(userName,interest)', (field) => {
      const userName = form.values.userName;
      const interest = form.values.interest;
      form.setFieldState('welcome', (state) => {
        state.value = `${userName}${interest}`
      })
    })
  },
});

const FormilyForm: FC<any> = () => {
  // const onFieldsChange = (values: any) => {
  //   console.log('onFieldsChange:', values);
  // }

  // const onValuesChange = (values: any) => {
  //   console.log('onValuesChange:', values, myForm);
  // }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  // const handleBlur = (evt: any, fieldName: string) => {
  //   console.log('blur:', evt.target.value, fieldName, myForm.getFieldValue('userName'), myForm.getFieldValue('interest'));
  //   const targetVal = evt.target.value;

  //   const userName = myForm.getFieldValue('userName');
  //   const interest = myForm.getFieldValue('interest');

  //   let newVal = '';
  //   if (fieldName === 'userName') {
  //     newVal = `${targetVal}喜欢${interest}`
  //   }

  //   if (fieldName === 'interest') {
  //     newVal = `${userName}喜欢${targetVal}`
  //   }

  //   myForm.setFieldValue('welcome', newVal)
  // }

  return (
    <FormProvider form={form}>
      <FormLayout layout="vertical">
        <Field
          name="userName"
          title="姓名"
          required
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="interest"
          title="爱好"
          required
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="welcome"
          title="欢迎语"
          disabled
          decorator={[FormItem]}
          component={[Input]}
        />
      </FormLayout>

      <FormButtonGroup>
        <Submit onSubmit={onFinish}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
export default FormilyForm;