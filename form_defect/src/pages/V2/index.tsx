import { message } from 'antd';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getIdCardInfo } from '../../utils/index';
import { observer } from "@formily/reactive-react";


// 身份证正则
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 手机号正则
const phoneReg = /^1[3456789]\d{9}$/;


type itemType = {
    name: string, //属性名
    label: string, //字段名
    msg?: any,//校验信息
    component: any //组件
}

// FormItem组件
const FormItem = (item: itemType) => {
    console.log("----xxxx-----------", item)
    return <p>
        {item.label}
        {item.component}
        {
            item.msg && <span className='msg_error'>{item.msg}</span>
        }
    </p>
}

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
        // message.success("提交成功")
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
        console.log("--------------渲染--------",
            name,
            idCard,
            sex,
            birthday,
            phone)
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} onChange={(e: any) => checkForm(e.target.name)}>
            <FormItem label="姓名：" name="name" component={<input name="name" />} msg={nameMsg} />
            <FormItem label="身份证号：" name="idCard" component={<input name="idCard" onChange={onChange} />} msg={idCardMsg} />
            <FormItem label="性别：" name="sex" component={<>
                <input type="radio" name="sex" value="男" onChange={() => checkForm("sex")} />男
                <input type="radio" name="sex" value="女" onChange={() => checkForm("sex")} />女</>} msg={sexMsg} />
            <FormItem label="出生日期：" name="birthday" component={<input name="birthday" />} msg={birthdayMsg} />
            <FormItem label="联系电话：" name="phone" component={<input name="phone" />} msg={phoneMsg} />
            <button type="submit">提交</button>
        </form>
    );
};

export default MyForm;
