// @ts-nocheck
import { useRef } from 'react';
import MyInput from './myInput';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    // 这行代码不起作用，因为 DOM 节点没有被暴露出来：
    console.log('ref.current:', ref.current)
  }

  return (
    <form>
      <MyInput placeholder="Enter your name" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
