/**
 * @description 受控组件方式, O(N)渲染
 * @link https://zh-hans.legacy.reactjs.org/docs/forms.html#controlled-components
 */
import React, { FC, useCallback, useMemo, useState } from 'react';
import './style.css';

const V1: FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [userNameMessage, setUserNameMessage] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>('');

  // 用户名
  const handleUserNameChange = useCallback((e: any) => {
    const value = e.target.value;
    setUserNameMessage(!!value ? '' : '该字段是必填字段');
    setUserName(value)
  }, [])

  // 密码
  const handlePasswordChange = useCallback((e: any) => {
    const value = e.target.value;
    setPassword(value);

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
  }, [confirmPassword]);

  // 确认密码
  const handleConfirmPasswordChange = useCallback((e: any) => {
    const value = e.target.value;
    setConfirmPassword(value);

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

  }, [password])

  // 提交
  const submit = (evt: any) => {
    evt.preventDefault();
    const param = {
      userName: userName,
      password: password,
      confirmPassword: confirmPassword
    }
    console.log('Success:', param);
    alert(JSON.stringify(param));
  };

  // 按照状态
  const disabled = useMemo(() => {
    return !!(userName && password && confirmPassword && password === confirmPassword);
  }, [userName, password, confirmPassword]);

  console.log('render:', Date.now())
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
              value={userName}
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
              value={password}
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {
            confirmPasswordMessage && <div className='message'>{confirmPasswordMessage}</div>
          }
        </div>
        <div className='field'>
          <div className='item'>
            <button
              type='submit'
              style={{ marginLeft: 200 }}
              disabled={!disabled}
            >注册</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default V1;