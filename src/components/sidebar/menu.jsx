const Menu = [
  {
    path: '/menu',
    icon: 'fa fa-align-left',
    title: 'Administrators',
    children: [
      { path: '/admin/roles', title: 'Roles' },
      { path: '/admin/add-new-admin', title: 'Add Admin' },
    ],
  },
  {
    path: '/',
    icon: 'fas fa-users',
    title: 'Subscribers',
    children: [
      { path: '/subscribers', title: 'Subscribers List' },
      { path: '/subscribers/add-subscribers', title: 'Add Subscriber' },
      { path: '/menu/menu-1-3', title: 'Menu 1.3' },
    ],
  },
  {
    path: '/',
    icon: 'fas fa-video',
    title: 'Content Management',
    children: [
      {
        path: '/videos/singles',
        title: 'Manage Single Videos',
        children: [
          { path: '/videos/singles/view', title: 'View Videos' },
          { path: '/videos/signles/add-new-video', title: 'Add Video' },
        ],
      },
      {
        path: '/videos/singles',
        title: 'Manage Series Videos',
        children: [
          { path: '/videos/series/view', title: 'View Videos' },
          { path: '/menu/menu-1-1/menu-2-1/menu-3-2', title: 'Menu 3.2' },
        ],
      },
      {
        path: '/videos/singles',
        title: 'Manage Live Videos',
        children: [
          { path: '/menu/menu-1-1/menu-2-1/menu-3-1', title: 'Menu 3.1' },
          { path: '/menu/menu-1-1/menu-2-1/menu-3-2', title: 'Menu 3.2' },
        ],
      },
      {
        path: '/videos/singles',
        title: 'Manage Category',
        children: [
          { path: '/videos/manage/language', title: 'Manage Languages' },
          { path: '/videos/manage/genre', title: 'Manage Genres' },
          { path: '/videos/manage/categories', title: 'Manage Categories' },
          { path: '/videos/manage/cast-crew', title: 'Manage Cast / Crew' },
        ],
      },
    ],
  },
];

export default Menu;
