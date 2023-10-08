import { message } from 'antd';
import { useRef, useState } from 'react';
import { getIdCardInfo } from '../../utils/index';

// 身份证正则
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 手机号正则
const phoneReg = /^1[3456789]\d{9}$/;

type itemType = {
    label: string, //字段名
    msg?: any,//校验信息
    component: any //组件
}
// FormItem组件
const FormItem = (item: itemType) => {
    console.log("----xxxx-----------", item)
    return <p className='form'>
        <div className='form_item'>
            <div className='form_label'>{item.label}</div>
            {item.component}
        </div>
        {
            item.msg && <div className='form_msg'>{item.msg}</div>
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
        console.log("--------------渲染--------",
            name,
            idCard,
            sex,
            birthday,
            phone)
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} onChange={(e: any) => checkForm(e.target.name)}>
            <FormItem label="姓名：" component={<input name="name" />} msg={nameMsg} />
            <FormItem label="身份证号：" component={<input name="idCard" onChange={onChange} />} msg={idCardMsg} />
            <FormItem label="性别：" component={<>
                <input type="radio" name="sex" value="男" />男
                <input type="radio" name="sex" value="女" />女</>} msg={sexMsg} />
            <FormItem label="出生日期：" component={<input name="birthday" />} msg={birthdayMsg} />
            <FormItem label="联系电话：" component={<input name="phone" />} msg={phoneMsg} />
            <button type="submit">提交</button>
        </form>
    );
};

export default MyForm;
