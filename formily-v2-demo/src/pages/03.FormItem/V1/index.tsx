import React, { FC, useMemo, useRef, useState } from 'react';
import './style.css';

const formData = {
  "name": '',
  "password": '',
  "confirmPassword": ''
};

type TField = {
  value: string;
  errMsg?: string;
  valid: boolean;
}

const DemoPage: FC<any> = () => {
  const nameRef = useRef<TField>({
    value: '',
    errMsg: '该字段是必填字段',
    valid: true,
  });
  const passwordRef = useRef<TField>({
    value: '',
    errMsg: '该字段是必填字段',
    valid: true,
  });
  const confirmPasswordRef = useRef<TField>({
    value: '',
    errMsg: '该字段是必填字段',
    valid: true,
  });

  const [values, setValues] = useState(formData);

  const disabled = useMemo(() => {
    return !(values.name && values.confirmPassword && values.password && values.confirmPassword === values.password);
  }, [values]);


  const handleChange = (e: any, type: 'name' | 'password' | 'confirmPassword') => {
    const val = e.target.value;

    // 更新结果
    const newValues = {
      ...values,
    }
    newValues[type] = val;

    if (type === 'name') {
      nameRef.current = {
        ...nameRef.current,
        value: val,
        valid: !!val,
        errMsg: '该字段是必填字段'
      }
      setValues(newValues);
      return;
    }

    if (type === 'password') {
      // 比较判断
      if (!!newValues.confirmPassword) {
        passwordRef.current = {
          ...passwordRef.current,
          valid: newValues.confirmPassword === newValues.password,
          errMsg: 'Password does not match Confirm Password.'
        }
        confirmPasswordRef.current = {
          ...confirmPasswordRef.current,
          valid: newValues.confirmPassword === newValues.password,
          errMsg: 'Password does not match Confirm Password.'
        }
      } else {
        passwordRef.current = {
          ...passwordRef.current,
          valid: !!newValues.password,
          errMsg: '该字段是必填字段',
        }
        confirmPasswordRef.current = {
          ...confirmPasswordRef.current,
          valid: true,
          errMsg: 'Password does not match Confirm Password.'
        }
      }
      setValues(newValues);
      return;
    }

    if (type === 'confirmPassword') {
      if (!!newValues.password) {
        passwordRef.current = {
          ...passwordRef.current,
          valid: newValues.confirmPassword === newValues.password,
          errMsg: 'Password does not match Confirm Password.'
        }
        confirmPasswordRef.current = {
          ...confirmPasswordRef.current,
          valid: newValues.confirmPassword === newValues.password,
          errMsg: 'Password does not match Confirm Password.'
        }
      } else {
        confirmPasswordRef.current = {
          ...confirmPasswordRef.current,
          valid: !!newValues.password,
          errMsg: '该字段是必填字段',
        }
        passwordRef.current = {
          ...passwordRef.current,
          valid: true,
          errMsg: 'Password does not match Confirm Password.'
        }
      }
      setValues(newValues);
      return;
    }
  }

  const onFinish = (evt: any) => {
    console.log('success:', values);
    alert(JSON.stringify(values))
    evt.preventDefault();
  };

  console.log('value', values)
  return (
    <div className='normalV2'>
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
      <form name="basic" onSubmit={e => onFinish(e)}>
        <div className='field'>
          <div className='item'>
            <label className='label'>Name</label>
            <input
              type='text'
              name="name"
              id="name"
              className='input'
              placeholder="Please Input"
              onChange={(e) => handleChange(e, 'name')}
            />
          </div>
          {
            !nameRef.current.valid && <div className='error'>{nameRef.current.errMsg}</div>
          }
        </div>
        <div className='field'>
          <div className='item'>
            <label className='label'>Password</label>
            <input
              type='password'
              name="password"
              id="password"
              className='input'
              placeholder="Please Input"
              onChange={(e) => handleChange(e, 'password')}
            />
          </div>
          {
            !passwordRef.current.valid && <div className='error'>{passwordRef.current.errMsg}</div>
          }
        </div>
        <div className='field'>
          <div className='item'>
            <label className='label'>Confirm Password</label>
            <input
              type='password'
              name="confirmPassword"
              id="confirmPassword"
              className='input'
              placeholder="Please Input"
              onChange={(e) => handleChange(e, 'confirmPassword')}
            />
          </div>
          {
            !confirmPasswordRef.current.valid && <div className='error'>{confirmPasswordRef.current.errMsg}</div>
          }
        </div>
        <div className='item'>
          <code>
            <pre>
              {JSON.stringify(values, null, 2)}
            </pre>
          </code>
        </div>
        <div className='item'>
          <input
            style={{ 
              marginLeft: 200,
              color: disabled ? 'gray' : 'blue'
            }}
            type='submit'
            disabled={disabled}
          />
        </div>
      </form>
    </div>

  )
}

export default DemoPage;