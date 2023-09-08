import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const testMenuItems = [
    {
      title: '原生Form',
      href: '/normalForm',
    },
    {
      title: 'antd-from',
      href: '/antForm',
    },
    {
      title: 'formily-from',
      href: '/formilyForm',
    },
  ];

  // <li><NavLink to="/">Home</NavLink></li>
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-gray-200 text-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase'>
        三种表单联动实现方式
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-gray-100 w-full md:w-60'>
          <nav>
            <ul>
              {testMenuItems.map(({ href, title }) => (
                <li className='m-2' key={title}>
                  <NavLink to={href} >
                    <p className={'text-black'}>{title}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={'flex-1'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}