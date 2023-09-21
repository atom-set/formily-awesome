import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const [pagePath, setPagePath] = useState(window.location.pathname);
  const testMenuItems = [
    // 联动
    {
      title: '联动：原生方式实现联动',
      href: '/normalForm',
    },
    {
      title: '联动：antd 方式实现联动',
      href: '/antForm',
    },
    {
      title: '联动：formily 方式实现联动',
      href: '/formilyForm',
    },
    // 用户登陆
    {
      title: '登陆：用户登陆注册: 受控组件方式，输入和错误信息都是非精确渲染',
      href: '/userLogin/v1',
    },
    {
      title: '登陆：用户登陆注册: 非受控组件方式，错误信息非精确渲染',
      href: '/userLogin/v2',
    },
    {
      title: '登陆：用户登陆注册: Mobx方式，错误信息非精确渲染',
      href: '/userLogin/v3',
    },

    // 封装FormItem，解决样本代码
    {
      title: 'FormItem：大量样本代码',
      href: '/formItem/v1',
    },
    {
      title: 'FormItem：封装FromItem解决样本代码',
      href: '/formItem/v2',
    },
    {
      title: 'FormItem：Formily版本',
      href: '/formItem/v3',
    },

    
    // antd组件
    // {
    //   title: 'antd最小组件集合',
    //   href: '/antd/v1',
    // },
    // {
    //   title: 'antd最小组件集合间关系',
    //   href: '/antd/v2',
    // },
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