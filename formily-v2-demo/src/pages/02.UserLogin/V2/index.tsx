/**
 * @description 非受控组件方式 O(N)
 * @link https://zh-hans.legacy.reactjs.org/docs/uncontrolled-components.html
 */
import React, { FC, useRef, useState } from 'react';
import './style.css';

const V2: FC = () => {
  const userNameRef = useRef<any>('');
  const [userNameMessage, setUserNameMessage] = useState<string>('');

  const passwordRef = useRef<any>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const confirmPasswordRef = useRef<any>('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>('');

  // 用户名
  const handleUserNameChange = () => {
    const value = userNameRef.current.value
    setUserNameMessage(!!value ? '' : '该字段是必填字段');
  }

  // 密码
  const handlePasswordChange = (e: any) => {
    const value = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!value) {
      setPasswordMessage('该字段是必填字段');
      setConfirmPasswordMessage(!!confirmPassword ? '' : '该字段是必填字段');
    } else if (!!confirmPassword && value !== confirmPassword) {
      setPasswordMessage('Password does not match Confirm Password.');
      setConfirmPasswordMessage('Password does not match Confirm Password.');
    } else {
      setPasswordMessage('');
      setConfirmPasswordMessage('');
    }
  }

  // 确认密码
  const handleConfirmPasswordChange = (e: any) => {
    const value = confirmPasswordRef.current.value;
    const password = passwordRef.current.value;

    if (!value) {
      setConfirmPasswordMessage(!!password ? '' : '该字段是必填字段');
      setPasswordMessage('该字段是必填字段');
    } else if (!!password && value !== password) {
      setPasswordMessage('Confirm Password does not match Password.');
      setConfirmPasswordMessage('Confirm Password does not match Password.');
    } else {
      setPasswordMessage('');
      setConfirmPasswordMessage('');
    }
  }

  // 提交
  const submit = (evt: any) => {
    evt.preventDefault();
    const param = {
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }
    console.log('Success:', param);
    alert(JSON.stringify(param));
  };

  // 按照状态
  const validDisabled = () => {
    return !!(userNameRef.current.value && passwordRef.current.value && confirmPasswordRef.current.value && passwordRef.current.value === confirmPasswordRef.current.value);
  };

  console.log('render:', Date.now());

  return (
    <div>
      <form
        name="userLogin"
        className='user-login'
        onSubmit={submit}
      >
        <div className='field'>
          <div className='item'>
            <label className='label required'>User Name</label>
            <input
              type='text'
              className='input'
              name="userName"
              ref={userNameRef}
              onChange={handleUserNameChange}
            />
          </div>
          {
            userNameMessage && <div className='message'>{userNameMessage}</div>
          }
        </div>
        <div className='field'>
          <div className='item'>
            <label className='label required'>Password</label>
            <input
              type='password'
              className='input'
              name="password"
              ref={passwordRef}
              onChange={handlePasswordChange}
            />
          </div>
          {
            passwordMessage && <div className='message'>{passwordMessage}</div>
          }
        </div>
        <div className='field'>
          <div className='item'>
            <label className='label  required'>Confirm Password</label>
            <input
              type='password'
              className='input'
              name="confirmPassword"
              ref={confirmPasswordRef}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {
            confirmPasswordMessage && <div className='message'>{confirmPasswordMessage}</div>
          }
        </div>
        {/* {InputComp()}
        {InputMemoComp} */}
        <div className='field'>
          <div className='item'>
            <button
              type='submit'
              style={{ marginLeft: 200 }}
              disabled={!validDisabled()}
            >注册</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default V2;