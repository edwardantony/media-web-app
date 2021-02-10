import React from 'react';
import Dashboard from '../pages/dashboard/Dashboard.js';
import Login from './../pages/user/SignIn';
import SignUp from './../pages/user/SignUp';
import Subscribers from '../pages/subscribers/Subscribers';
import VideoSingle from '../pages/videos/SingleVideos';
import VideoSeries from './../pages/videos/SeriesVideos';
import VideoLanguages from './../pages/videos/Languages';
import VideoGenre from './../pages/videos/Genre';
import VideoCategories from './../pages/videos/Categories';
import Adminstrators from '../pages/adminstrators/Adminstrators';
import AdminRoles from '../pages/adminstrators/AdminRoles';
import { AddAdmin } from '../pages/adminstrators/AddAdmin';
import { AddSubscriber } from '../pages/subscribers/AddSubscribers';

const routes = [
  {
    path: '/',
    exact: true,
    title: 'Dashboard',
    component: () => <Dashboard />,
  },
  {
    path: '/login',
    exact: true,
    title: 'Login',
    component: () => <Login />,
  },
  {
    path: '/signup',
    exact: true,
    title: 'Signup',
    component: () => <SignUp />,
  },
  {
    path: '/adminstrator/view-adminstrators',
    exact: true,
    title: 'Adminstrators',
    component: () => <Adminstrators />,
  },
  {
    path: '/adminstrator/admin-groups',
    exact: true,
    title: 'Admin Roles',
    component: () => <AdminRoles />,
  },
  {
    path: '/adminstrator/add-admin',
    exact: true,
    title: 'Add Admin',
    component: () => <AddAdmin />,
  },
  {
    path: '/subscriber/view-subscribers',
    exact: true,
    title: 'Subscribers',
    component: () => <Subscribers />,
  },
  {
    path: '/subscriber/add-subscriber',
    exact: true,
    title: 'Add Subscriber',
    component: () => <AddSubscriber />,
  },
  {
    path: '/content-management/single-video/view',
    exact: true,
    title: 'Single Videos',
    component: () => <VideoSingle />,
  },
  {
    path: '/content-management/series-video/view',
    exact: true,
    title: 'Series Videos',
    component: () => <VideoSeries />,
  },
  {
    path: '/content-management/video-banners',
    exact: true,
    title: 'Manage Language',
    component: () => <VideoLanguages />,
  },
  {
    path: '/content-management/video-language',
    exact: true,
    title: 'Manage Language',
    component: () => <VideoLanguages />,
  },
  {
    path: '/content-management/video-genere',
    exact: true,
    title: 'Manage Genre',
    component: () => <VideoGenre />,
  },
  {
    path: '/content-management/video-category',
    exact: true,
    title: 'Manage Genre',
    component: () => <VideoCategories />,
  },
];

export default routes;
