interface nav {
  name: string,
  href: string,
  current: boolean
}

export const navigation: nav[] = [
  { name: 'Каталог', href: '#', current: false },
  { name: 'Поиск', href: '#', current: false },
  { name: 'Команды', href: '/team', current: false },
  { name: 'Форум', href: '#', current: false }
];

export const authNav: nav[] = [
  { name: 'Добавить тайтл', href: '/book/add', current: false },
  { name: 'Добавить команду', href: '/team/add', current: false },
  { name: 'Добавить услугу', href: '#', current: false }
];
