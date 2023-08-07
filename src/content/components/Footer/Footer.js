import React from 'react';

import Logo from '../../icons/logo.png';
import { ReactComponent as DiscordIcon } from '../../icons/vk.svg';

const Footer = () => {
  return (
    <div className="w-full bg-white flex">
      <div className="w-[1152px] mx-auto py-8 flex flex-row justify-between [&>*]:my-auto ">
        <div>
          <img src={Logo} width={240} height={59} />
          <span>© 2023 Readzone. Все права защищены. </span>
        </div>
        <div className="footerNav">
          <a>О нас</a>
          <a>Обратная связь</a>
          <a>Пользовательское соглашение</a>
          <a>Лицензия</a>
          <a>Для правообладателей</a>
        </div>
        <div>
          <div className="flex flex-row justify-between w-[200px] mx-auto mb-2">
            <DiscordIcon />
            <DiscordIcon />
            <DiscordIcon />
            <DiscordIcon />
          </div>
          <span>Поддержка: readZone@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
