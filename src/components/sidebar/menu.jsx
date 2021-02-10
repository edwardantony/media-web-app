const Menu = [
  { 
  	path: '/', icon: 'fa fa-th', title: 'Dashboard'
  },
  { path: '#', icon: 'fa fa-user-secret', title: 'Adminstrators',
    children: [
      { path: '/adminstrator/view-adminstrators', title: 'View Admins' },
      { path: '/adminstrator/add-admin', title: 'Add Admin' },
      { path: '/adminstrator/admin-groups', title: 'Admin Groups' },
    ]
  },
  { path: '#', icon: 'fa fa-users', title: 'Subscribers',
    children: [
      { path: '/subscriber/view-subscribers', title: 'View Subscribers' },
      { path: '/subscriber/add-subscriber', title: 'Add Subscriber' },
    ]
  },
  { path: '#', icon: 'fa fa-video', title: 'Content Managment',
    children: [
      { path: '#', title: 'Manage Single Videos',
        children: [
          { path: '/content-management/single-video/view', title: 'View Single Videos' },
          { path: '/content-management/single-video/add', title: 'Add Single Video' },
        ],
      },
      { path: '#', title: 'Manage Series Videos',
        children: [
          { path: '/content-management/series-video/view', title: 'View Series Videos' },
          { path: '/content-management/series-video/add', title: 'Add Series Video' },
        ],
      },
      { path: '#', title: 'Manage Live Videos',
        children: [
          { path: '/content-management/live-video/view', title: 'View Live Videos' },
          { path: '/content-management/live-video/add', title: 'Add Live Video' },
        ],
      },
      { path: '/content-management/video-banners', title: 'Manage Banners' },
      { path: '/content-management/video-category', title: 'Manage Categorys' },
      { path: '/content-management/video-language', title: 'Manage Languages' },
      { path: '/content-management/video-genre', title: 'Manage Genre' },
    ]
  },
  { path: '#', icon: 'fa fa-flag', title: 'Policies',
    children: [
      { path: '/page/view-policies', title: 'View Policies' },
      { path: '/page/add-policies', title: 'Add Policies' },
    ]
  },
]

export default Menu;
