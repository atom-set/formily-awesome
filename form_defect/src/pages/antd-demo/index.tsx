import { Button, Checkbox, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import React from 'react';
import { getIdCardInfo } from '../../utils/index';
import dayjs from 'dayjs';

// 身份证正则
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 手机号正则
const phoneReg = /^1[3456789]\d{9}$/;

const App: React.FC = () => {

    // 表单实例
    const [form] = Form.useForm();

    // 联动-根据身份证号自动识别性别、出生日期
    const onValuesChange = (changedFields: any, allFields: any) => {
        console.log('onFieldsChange:', changedFields, allFields);
        if (changedFields.idCard && idCardReg.test(changedFields.idCard)) {
            const { sex, birthday } = getIdCardInfo(changedFields.idCard);
            form.setFieldsValue({
                "sex": sex,
                "birthday": dayjs(birthday, "YYYY-MM-DD")
            });
        }
    };

    // 提交成功
    const onFinish = (values: any) => {
        message.success("提交成功")
        console.log('Success:', values);
    };

    // 提交失败
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onValuesChange={onValuesChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="姓名"
                name="username"
                rules={[{ required: true, message: '请输入你的姓名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="身份证号"
                name="idCard"
                rules={[{ required: true, pattern: idCardReg, message: '请输入你的身份证号!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="性别"
                name="sex"
                rules={[{ required: true, message: '请选择你的性别!' }]}
            >
                <Radio.Group>
                    <Radio value="男"> 男 </Radio>
                    <Radio value="女"> 女 </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="出生日期"
                name="birthday"
                rules={[{ required: true, message: '请选择你的出生日期!' }]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label="联系电话"
                name="phone"
                rules={[{ required: true, pattern: phoneReg, message: '请输入你的手机号!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5 }} style={{ margin: 0 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default App;