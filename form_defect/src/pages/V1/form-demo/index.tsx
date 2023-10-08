import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getIdCardInfo } from '../../../utils/index';


// 身份证正则
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 手机号正则
const phoneReg = /^1[3456789]\d{9}$/;
const MyForm = () => {

  // 表单数据状态
  const formRef: any = useRef(null);

  // 表单校验信息
  const [nameMsg, setNameMsg] = useState<string>("");
  const [idCardMsg, setIdCardMsg] = useState<string>("");
  const [sexMsg, setSexMsg] = useState<string>("");
  const [birthdayMsg, setBirthdayMsg] = useState<string>("");
  const [phoneMsg, setPhoneMsg] = useState<string>("");

  // 联动-根据身份证号自动识别性别、出生日期
  const onChange = (e: any) => {
    checkForm("idCard");
    if (idCardReg.test(e.target.value)) {
      const { sex, birthday } = getIdCardInfo(e.target.value);
      formRef.current.sex.value = sex;
      formRef.current.birthday.value = birthday;
      checkForm("sex");
      checkForm("birthday");
    }
  };

  // 提交
  const handleSubmit = (e: any) => {
    e.preventDefault();
    checkForm();
    message.success("提交成功")
  };


  // 表单校验
  const checkForm = (type: string = "all") => {
    // 使用formRef.current来获取表单元素
    const formElement: any = formRef.current;

    // 使用formElement来获取表单字段的值
    const name = formElement.name.value;
    const idCard = formElement.idCard.value;
    const sex = formElement.sex.value;
    const birthday = formElement.birthday.value;
    const phone = formElement.phone.value;

    // 表单校验
    if (type == "all" || type == "name") {
      setNameMsg(!name ? "请填写姓名" : "")
    }
    if (type == "all" || type == "idCard") {
      setIdCardMsg(!idCardReg.test(idCard) ? "身份证格式错误" : "")
    }
    if (type == "all" || type == "sex") {
      setSexMsg(!sex ? "请填写性别" : "")
    }
    if (type == "all" || type == "birthday") {
      setBirthdayMsg(!birthday ? "请填写出生日期" : "")
    }
    if (type == "all" || type == "phone") {
      setPhoneMsg(!phoneReg.test(phone) ? "联系电话格式错误" : "")
    }
  }

  console.log("---------渲染--------")

  return (
    <form className='form' ref={formRef} onSubmit={handleSubmit} onChange={(e: any) => checkForm(e.target.name)}>
      <p>
        <div className='form_item'>
          <div className='form_label'>姓名：</div>
          <input type="text" name="name" />
        </div>
        {
          nameMsg && <div className='form_msg'>{nameMsg}</div>
        }
      </p>
      <p>
        <div className='form_item'>
          <div className='form_label'>身份证号：</div>
          <input type="text" name="idCard" onChange={onChange} />
        </div>
        {
          idCardMsg && <div className='form_msg'>{idCardMsg}</div>
        }
      </p>
      <p>
        <div className='form_item'>
          <div className='form_label'>性别：</div>
          <input type="radio" name="sex" value="男" />男
          <input type="radio" name="sex" value="女" />女
        </div>
        {
          sexMsg && <div className='form_msg'>{sexMsg}</div>
        }
      </p>
      <p>
        <div className='form_item'>
          <div className='form_label'>出生日期：</div>
          <input type="text" name="birthday" />
        </div>
        {
          birthdayMsg && <div className='form_msg'>{birthdayMsg}</div>
        }
      </p>
      <p>
        <div className='form_item'>
          <div className='form_label'>联系电话：</div>
          <input type="text" name="phone" />
        </div>
        {
          phoneMsg && <div className='form_msg'>{phoneMsg}</div>
        }
      </p>
      {/* {
        Array.from({ length: 1000 }, (_, index) => {
          return <>
            <p>
              测试：
              <input type="text" name={index + ""} onChange={() => checkForm("phone")} />
              {
                phoneMsg && <span className='form_msg'>{phoneMsg}</span>
              }
            </p>
            <br />
          </>
        })
      } */}
      <button type="submit">提交</button>
    </form>
  );
};

export default MyForm;
