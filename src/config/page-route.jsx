import React from 'react';
import Dashboard from '../pages/dashboard/Dashboard.js';
import Login from './../pages/user/SignIn';
import SignUp from './../pages/user/SignUp';

import Adminstrators from '../pages/adminstrators/Adminstrators';
import { AddAdmin } from '../pages/adminstrators/AddAdmin';
import AdminRoles from '../pages/adminstrators/AdminRoles';

import { AddSubscriber } from '../pages/subscribers/AddSubscribers';
import Subscribers from '../pages/subscribers/Subscribers';

import VideoSingle from '../pages/videos/SingleVideos';
import { AddSingleVideo } from '../pages/videos/AddSingleVideo';
import VideoSeries from './../pages/videos/SeriesVideos';
import VideoCategories from './../pages/videos/Categories';
import VideoBanners from './../pages/videos/Banners';
import VideoLanguages from './../pages/videos/Languages';
import VideoGenre from './../pages/videos/Genre';

import Policies from './../pages/policies/Policies';
import { AddPolicy } from './../pages/policies/AddPolicy';



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
    path: '/content-management/single-video/add',
    exact: true,
    title: 'Add Single Videos',
    component: () => <AddSingleVideo />,
  },
  {
    path: '/content-management/series-video/view',
    exact: true,
    title: 'Series Videos',
    component: () => <VideoSeries />,
  },
  
  {
    path: '/content-management/video-category',
    exact: true,
    title: 'Manage Genre',
    component: () => <VideoCategories />,
  },
  {
    path: '/content-management/video-banners',
    exact: true,
    title: 'Manage Language',
    component: () => <VideoBanners />,
  },
  {
    path: '/content-management/video-language',
    exact: true,
    title: 'Manage Language',
    component: () => <VideoLanguages />,
  },
  {
    path: '/content-management/video-genre',
    exact: true,
    title: 'Manage Genre',
    component: () => <VideoGenre />,
  },

  {
    path: '/page/view-policies',
    exact: true,
    title: 'View Policies',
    component: () => <Policies />,
  },

  {
    path: '/page/add-policy',
    exact: true,
    title: 'Add Policy',
    component: () => <AddPolicy />,
  },
];

export default routes;
