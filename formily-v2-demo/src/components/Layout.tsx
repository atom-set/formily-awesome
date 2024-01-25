import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const [pagePath, setPagePath] = useState(window.location.pathname);
  const testMenuItems = [
    // 联动
    {
      title: '联动：原生方式实现联动',
      href: '/normalLinkage',
    },
    {
      title: '联动：antd 方式实现联动',
      href: '/antLinkage',
    },
    {
      title: '联动：formily 方式实现联动',
      href: '/formilyLinkage',
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

    // arrayTable
    {
      title: 'ArrayTable 组件',
      href: '/arrayTable'
    },
    // formTab
    {
      title: 'FormTab组件',
      href: '/formTab'
    },

    // antd组件
    {
      title: 'antd组件: antd最小组件集合',
      href: '/antd/v1',
    },
    {
      title: 'Formily JSX 形式执行过程',
      href: '/antd/v2',
    },
    {
      title: 'Formily JSX 自定义组件',
      href: '/antd/v3',
    },
    {
      title: 'Formily Schema 形式执行过程',
      href: '/antd/v8',
    },
    {
      title: '扩展自定义组件',
      href: '/antd/v9',
    },

    // observer
    {
      title: 'observer ref',
      href: '/observer/ref',
    },

    // reactive 系列
    {
      title: 'reactive系列: observable函数',
      href: '/reactive/v1',
    },
    {
      title: 'reactive系列: batch',
      href: '/reactive/v2',
    },

    // registerPatches 系列
    {
      title: 'registerPatches',
      href: '/registerPatches/v1',
    },

    // react api 系列
    {
      title: 'react api 系列: ForwardRef',
      href: '/api/forwardRef/v1',
    },
    {
      title: 'react api 系列: 多个组件中转发 ref',
      href: '/api/forwardRef/v2',
    },
    {
      title: 'react api 系列: 暴露一个命令式句柄而不是 DOM 节点',
      href: '/api/forwardRef/v3',
    },
    {
      title: 'react api 系列: useContent',
      href: '/api/useContent/v1',
    },

    {
      title: 'designable 版本用户登陆',
      href: '/designable/login',
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