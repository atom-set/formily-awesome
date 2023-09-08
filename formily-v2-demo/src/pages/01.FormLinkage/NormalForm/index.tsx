import React, { FC, useRef, useState } from 'react';
import './style.css';

const NormalForm: FC<any> = () => {
  const userNameRef = useRef('张三')
  const interestRef = useRef('跑步');
  const [welcomeVal, setWelcomeVal] = useState('张三喜欢跑步');

  const onFinish = (evt: any) => {
    console.log('Success:', evt.target.userName.value);
    console.log('Success:', evt.target.interest.value);
    console.log('welcome:', evt.target.welcome.value);
    evt.preventDefault();
  };

  const handleBlur = (evt: any, fieldName: string) => {
    const targetVal = evt.target.value;
    console.log('blur:', evt, targetVal);

    const userName = document.getElementById('userName')?.innerText;
    const interest = document.getElementById('interest')?.innerText;

    let newVal = '';
    if (fieldName === 'userName') {
      newVal = `${targetVal}喜欢${interest}`
      userNameRef.current = targetVal;
    }

    if (fieldName === 'interest') {
      newVal = `${userName}喜欢${targetVal}`
      interestRef.current = targetVal;
    }
    console.log(newVal);
    setWelcomeVal(newVal)
  }

  return (
    <form name="basic" onSubmit={e => onFinish(e)} className='normal'>
      <div className='item'>
        <label className='label required'>姓名</label>
        <input
          type='text'
          id="userName"
          className='input'
          required
          name="userName"
          defaultValue={userNameRef.current}
          onChange={(evt) => handleBlur(evt, 'userName')}
        />
      </div>
      <div className='item'>
        <label className='label required'>爱好</label>
        <input
          type='text'
          id="interest"
          className='input'
          required
          name="interest"
          defaultValue={interestRef.current}
          onChange={(evt) => handleBlur(evt, 'interest')}
        />
      </div>
      <div className='item'>
        <label className='label'>欢迎语</label>
        <input
          type='text'
          id="welcome"
          className='input disabled'
          name="welcome"
          disabled
          value={welcomeVal}
        />
      </div>

      <div className='item'>
        <input type='submit' style={{ marginLeft: 200 }} />
      </div>
    </form>
  )
}
export default NormalForm;