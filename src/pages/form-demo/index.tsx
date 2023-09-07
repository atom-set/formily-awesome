import { message } from 'antd';
import React, { useRef } from 'react';
import { getIdCard } from '../../utils/index';


// 身份证正则
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 手机号正则
const phoneReg = /^1[3456789]\d{9}$/;
const MyForm = () => {

  const formRef: any = useRef(null);

  // 联动-根据身份证号自动识别性别、出生日期
  const onChange = (e: any) => {
    if (idCardReg.test(e.target.value)) {
      const { sex, birthday } = getIdCard(e.target.value);
      formRef.current.sex.value = sex;
      formRef.current.birthday.value = birthday;
    }
  };

  // 提交
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 使用formRef.current来获取表单元素
    const formElement: any = formRef.current;

    // 使用formElement来获取表单字段的值
    const name = formElement.name.value;
    const idCard = formElement.idCard.value;
    const sex = formElement.sex.value;
    const birthday = formElement.birthday.value;
    const phone = formElement.phone.value;

    // 表单校验
    if (!name) {
      message.error("请填写姓名")
    } else if (!idCardReg.test(idCard)) {
      message.error("身份证格式错误")
    } else if (!sex) {
      message.error("请填写性别")
    } else if (!birthday) {
      message.error("请填写出生日期")
    } else if (!phoneReg.test(phone)) {
      message.error("联系电话格式错误")
    } else {
      message.success("提交成功")
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        姓名:
        <input type="text" name="name" />
      </label>
      <br />
      <label>
        身份证号:
        <input type="text" name="idCard" onChange={onChange} />
      </label>
      <br />
      <label>
        性别:
        <input type="radio" name="sex" value="男" />男
        <input type="radio" name="sex" value="女" />女
      </label>
      <br />
      <label>
        出生日期:
        <input type="text" name="birthday" />
      </label>
      <br />
      <label>
        联系电话:
        <input type="text" name="phone" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
