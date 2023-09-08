import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';


const Home: FC<any> = () => {
  const [myForm] = Form.useForm();

  const onFieldsChange = (values: any) => {
    console.log('onFieldsChange:', values);
  }

  const onValuesChange = (values: any) => {
    console.log('onValuesChange:', values, myForm);
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleBlur = (evt: any, fieldName: string) => {
    console.log('blur:', evt.target.value, fieldName, myForm.getFieldValue('userName'), myForm.getFieldValue('interest'));
    const targetVal = evt.target.value;

    const userName = myForm.getFieldValue('userName');
    const interest = myForm.getFieldValue('interest');

    let newVal = '';
    if (fieldName === 'userName') {
      newVal = `${targetVal}喜欢${interest}`
    }

    if (fieldName === 'interest') {
      newVal = `${userName}喜欢${targetVal}`
    }

    myForm.setFieldValue('welcome', newVal)
  }

  return (
    <Form
      form={myForm}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        userName: '张飞',
        interest: '跑步',
        welcome: '张三喜欢跑步'
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onFieldsChange={onFieldsChange}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="姓名"
        name="userName"
        rules={[{ required: true, message: '请输入欢迎语' }]}
      >
        <Input onBlur={(evt) => handleBlur(evt, 'userName')} />
      </Form.Item>
      <Form.Item
        label="爱好"
        name="interest"
        rules={[{ required: true, message: '请输入欢迎语' }]}
      >
        <Input onBlur={(evt) => handleBlur(evt, 'interest')} />
      </Form.Item>

      <Form.Item
        label="欢迎语"
        name="welcome"
        rules={[{ required: true, message: '不能为空' }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default Home;