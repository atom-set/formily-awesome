import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const [pagePath, setPagePath] = useState(window.location.pathname);
  const testMenuItems = [
    // 联动
    {
      title: '原生方式实现联动',
      href: '/normalForm',
    },
    {
      title: 'antd 方式实现联动',
      href: '/antForm',
    },
    {
      title: 'formily 方式实现联动',
      href: '/formilyForm',
    },
    // 用户登陆
    {
      title: '用户登陆注册: 受控组件方式，输入和错误信息都是非精确渲染',
      href: '/userLogin/v1',
    },
    {
      title: '用户登陆注册: 非受控组件方式，错误信息非精确渲染',
      href: '/userLogin/v2',
    },
    {
      title: '用户登陆注册: Mobx方式，错误信息非精确渲染',
      href: '/userLogin/v3',
    },
    // antd组件
    {
      title: 'antd最小组件集合',
      href: '/antd/v1',
    },
  ];

  const handleClick = () => {
    setPagePath(window.location.pathname)
  };

  return (
    <div className='page'>
      {
        pagePath === '/' && <nav>
          <ul className="menu-list">
            {testMenuItems.map(({ href, title }) => (
              <li className='menu-item' key={title} onClick={handleClick}>
                <NavLink to={href}>
                  <p className={'text-black'}>{title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      }

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      {
        pagePath !== '/' && <a href="/" className="back">返回</a>
      }
    </div>
  );
}