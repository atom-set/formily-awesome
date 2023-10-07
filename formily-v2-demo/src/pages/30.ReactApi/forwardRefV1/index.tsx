// @ts-nocheck
import { useRef } from 'react';
import MyInput from './myInput';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    ref.current.style.backgroundColor = '#eee';
    console.log('ref.current:', ref.current)
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
