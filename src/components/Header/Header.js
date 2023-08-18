import React, { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Context } from '../..';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Logo from '../../icons/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

import { authNav, navigation } from './consts';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DefaultHeader = props => {
  const navigate = useNavigate();
  const { auth, logout, id } = props;
  return (
    <Disclosure as="nav" className="bg-white z-10 border-b-rose-500">
      {({ open }) => (
        <>
          <div className="px-4 max-w-full">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <button className="flex flex-shrink-0 items-center" onClick={() => navigate('/')}>
                  <img className="block h-8 w-auto lg:hidden" src={Logo} alt="Your Company" />
                  <img className="hidden h-8 w-auto lg:block" src={Logo} alt="Your Company" />
                </button>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 h-full">
                    {navigation.map(item => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : '',
                          'headerNavItem lineUnderWord'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Adding dropdown */}
                {auth ? (
                  <Menu as="div" className="relative mr-3">
                    <div>
                      <Menu.Button className="flex focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <PostAddIcon sx={{ fontSize: 32 }} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {authNav.map(item => (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black-700'
                                )}>
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : null}

                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-black-400 hover:text-white hover:bg-slate-800 focus:outline-none">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-8 w-8" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {auth ? (
                        <div>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={`user/${id}`}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black-700'
                                )}>
                                Профиль
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black-700'
                                )}>
                                Настройки
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={logout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black-700'
                                )}>
                                Выйти
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      ) : (
                        <div>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/login"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black-700'
                                )}>
                                Войти
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/registration"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black-700'
                                )}>
                                Регистрация
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-black-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const ReaderComponent = props => {
  return (
    <>
      <div className="mx-auto max-w-full">
        <div className="flex h-16"></div>
      </div>
    </>
  );
};

const HeaderComponent = observer(() => {
  const { user } = useContext(Context);
  const _user = toJS(user.user);
  const auth = user.isAuth;

  const location = useLocation();

  const validPage = new RegExp('^(/title/[0-9]/[0-9])$');
  const logout = () => {
    localStorage.removeItem('token');
    user.setIsAuth(false);
    user.setUser({});
    console.log('logout');
    window.location.reload(false);
  };

  return validPage.test(location.pathname) ? (
    <ReaderComponent />
  ) : (
    <DefaultHeader auth={auth} id={_user.id} logout={logout} />
  );
});

export default HeaderComponent;
