/**
 * @description Mobx 方式 + O(n)
 */
import React, { useRef } from 'react';
import { observer } from "mobx-react-lite"
import Store from "./store"
import './style.css';

const store = new Store();

const V3 = observer(() => {

  const userNameRef = useRef<any>('');
  const passwordRef = useRef<any>('');
  const confirmPasswordRef = useRef<any>('');

  // 用户名
  const handleUserNameChange = () => {
    const value = userNameRef.current.value;
    store.setUserNameMessage(!!value ? '' : '该字段是必填字段')
  }

  // 密码
  const handlePasswordChange = (e: any) => {
    const value = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!value) {
      store.setPasswordMessage('该字段是必填字段');
      store.setConfirmPasswordMessage(!!confirmPassword ? '' : '该字段是必填字段');
    } else if (!!confirmPassword && value !== confirmPassword) {
      store.setPasswordMessage('Password does not match Confirm Password.');
      store.setConfirmPasswordMessage('Password does not match Confirm Password.');
    } else {
      store.setPasswordMessage('');
      store.setConfirmPasswordMessage('');
    }
  }

  // 确认密码
  const handleConfirmPasswordChange = (e: any) => {
    const value = confirmPasswordRef.current.value;
    const password = passwordRef.current.value;

    if (!value) {
      store.setConfirmPasswordMessage(!!password ? '' : '该字段是必填字段');
      store.setPasswordMessage('该字段是必填字段');
    } else if (!!password && value !== password) {
      store.setPasswordMessage('Confirm Password does not match Password.');
      store.setConfirmPasswordMessage('Confirm Password does not match Password.');
    } else {
      store.setPasswordMessage('');
      store.setConfirmPasswordMessage('');
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
            store.userNameMessage && <div className='message'>{store.userNameMessage}</div>
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
            store.passwordMessage && <div className='message'>{store.passwordMessage}</div>
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
            store.confirmPasswordMessage && <div className='message'>{store.confirmPasswordMessage}</div>
          }
        </div>
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
})
export default V3;