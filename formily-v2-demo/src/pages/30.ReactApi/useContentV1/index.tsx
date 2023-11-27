import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function MyDemo() {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Form />
      </ThemeContext.Provider>
      <br />
      <button onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        console.log('点我了')
      }}>
        Toggle theme
      </button>
    </>
  )
}

interface IFormProps {
  children?: React.ReactNode;
}
function Form({ children }: IFormProps) {
  return (
    <div style={{ border: '1px solid #ff5000' }}>
      <h2>这是Form容器</h2>
      <Panel title="useContent">
        {children}
      </Panel>
    </div>
  );
}

interface IPanelProps {
  title: string;
  children: React.ReactNode;
}
function Panel({ title, children }: IPanelProps) {
  // const theme = useContext(ThemeContext);
  const className = 'panel';
  return (
    <div style={{ border: '1px solid blue', width: '80%', margin: '0 auto' }}>
      <h3>这是Panel面板</h3>
      <section className={className}>
        <h1>{title}</h1>
        {children}
        {/* <div>Panel Theme: {theme}</div> */}
        <Button>这是按钮</Button>
      </section>
    </div>
  )
}

interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
function Button({ children, onClick }: IButtonProps) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <div style={{ border: '1px solid red', width: '80%', margin: '0 auto' }}>
      <h4>这是Button按钮</h4>
      <button className={className} onClick={onClick}>
        {children}
      </button>
      <div>Button Theme: {theme}</div>
    </div>
  );
}
