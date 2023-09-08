import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const [pagePath, setPagePath] = useState(window.location.pathname);
  const testMenuItems = [
    {
      title: '原生Form形式实现用户登陆注册',
      href: '/normalForm',
    },
    {
      title: 'antd-from形式实现用户登陆注册',
      href: '/antForm',
    },
    {
      title: 'formily-from形式实现用户登陆注册',
      href: '/formilyForm',
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