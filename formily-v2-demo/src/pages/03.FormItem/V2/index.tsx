import React, { createContext, useMemo, useContext, useEffect } from "react";
import { createForm } from "@formily/core";
import { observer } from "@formily/reactive-react";
import './style.css';

//创建上下文，方便 Field 消费
const FormContext = createContext({});

//创建上下文，方便 FormItem 消费
const FieldContext = createContext({});

//状态桥接器组件
const Field = observer((props: any) => {
  const form: any = useContext(FormContext);

  //创建字段
  const field = form.createField(props);

  useEffect(() => {
    //挂载字段
    field.onMount();
    return () => {
      //卸载字段
      field.onUnmount();
    };
  });

  if (!field.visible || field.hidden) return null;

  //渲染字段，将字段状态与UI组件关联
  const component = React.createElement(field.component[0], {
    ...field.component[1],
    value: field.value,
    onChange: field.onInput
  });

  //渲染字段包装器
  // createElement(type, props, ...children)
  const decorator = React.createElement(
    field.decorator[0],
    field.decorator[1],
    component
  );

  return (
    <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
  );
});

// FormItem UI组件
const FormItem = observer(({ children }) => {
  const field: any = useContext(FieldContext);
  return (
    <div className='field'>
      <div className='item'>
        <label className='label'>{field.title}</label>
        {children}
      </div>
      <div className='error'>{field.selfErrors.join(",")}</div>
    </div>
  );
});

// Input UI组件
const Input = (props: any) => {
  return (
    <input
      {...props}
      value={props.value || ""}
      className='input'
    />
  );
};

//表单管理入口
const FormProvider = (props: any) => {
  useEffect(() => {
    //挂载表单
    props.form?.onMount();
    return () => {
      //卸载表单
      props.form?.onUnmount();
    };
  });

  return (
    <FormContext.Provider value={props.form}>
      {props.children}
    </FormContext.Provider>
  );
};

// 表单响应式监控器
const FormConsumer = observer((props: any) => {
  const form = useContext(FormContext);
  return <div>{props.children(form)}</div>;
});

/*
 * 以上逻辑都已经在 @formily/react 或 @formily/vue 中实现，实际使用无需重复编写
 */

const DemoPage = () => {
  const form: any = useMemo(() => {
    return createForm({ validateFirst: true });
  }, [])

  const createPasswordEqualValidate = (equalName: any) => (field: any) => {
    if (
      form.values.confirmPassword &&
      field.value &&
      form.values[equalName] !== field.value
    ) {
      field.selfErrors = ["Password does not match Confirm Password."];
    } else {
      field.selfErrors = [];
    }
  };

  console.log('DemoPage form:', form)

  return (
    <div className="uForm">
      <ul className='header'>
        <li>响应式计算能力</li>
        <li>校验能力</li>
        <ul>
          <li>Name、Password、Confirm Password非空</li>
          <li>Password、Confirm Password相等判断</li>
        </ul>
        <li>值管理能力</li>
        <li>联动管理能力</li>
      </ul>
      <FormProvider form={form}>
        <Field
          name="name"
          title="Name"
          required
          decorator={[FormItem]}
          component={[Input, { placeholder: "Please Input" }]}
        />
        <Field
          name="password"
          title="Password"
          required
          decorator={[FormItem]}
          component={[Input, { type: "password", placeholder: "Please Input" }]}
          reactions={createPasswordEqualValidate("confirmPassword")}
        />
        <Field
          name="confirmPassword"
          title="Confirm Password"
          required
          decorator={[FormItem]}
          component={[Input, { type: "password", placeholder: "Please Input" }]}
          reactions={createPasswordEqualValidate("password")}
        />
        <code>
          <pre>
            <FormConsumer>
              {(form: any) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
      </FormProvider>
    </div>
  );
};

export default DemoPage; 