import React from 'react';
import Home from '../pages/dashboard/Dashboard.js';
import Login from './../pages/user/SignIn';
import SignUp from './../pages/user/SignUp';
import Subscribers from '../pages/subscribers/Subscribers';
import SingleVideos from '../pages/videos/SingleVideos';
import SeriesVideos from './../pages/videos/SeriesVideos';
import ManageLanguages from './../pages/videos/ManageLanguages';
import ManageGenre from './../pages/videos/ManageGenre';
import ManageCategories from './../pages/videos/ManageCategories';
import AdminRoles from '../pages/adminstrators/AdminRoles';
import { AddAdmin } from '../pages/adminstrators/AddAdmin';
import { AddSubscriber } from '../pages/subscribers/AddSubscribers';

const routes = [
  {
    path: '/',
    exact: true,
    title: 'Home',
    component: () => <Home />,
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
    path: '/subscribers',
    exact: true,
    title: 'Subscribers',
    component: () => <Subscribers />,
  },
  {
    path: '/videos/singles/view',
    exact: true,
    title: 'Single Videos',
    component: () => <SingleVideos />,
  },
  {
    path: '/videos/series/view',
    exact: true,
    title: 'Series Videos',
    component: () => <SeriesVideos />,
  },
  {
    path: '/videos/manage/language',
    exact: true,
    title: 'Manage Language',
    component: () => <ManageLanguages />,
  },
  {
    path: '/videos/manage/genre',
    exact: true,
    title: 'Manage Genre',
    component: () => <ManageGenre />,
  },
  {
    path: '/videos/manage/categories',
    exact: true,
    title: 'Manage Genre',
    component: () => <ManageCategories />,
  },
  {
    path: '/admin/roles',
    exact: true,
    title: 'Admin Roles',
    component: () => <AdminRoles />,
  },
  {
    path: '/admin/add-new-admin',
    exact: true,
    title: 'Add Admin',
    component: () => <AddAdmin />,
  },
  {
    path: '/subscribers/add-subscribers',
    exact: true,
    title: 'Add Subscriber',
    component: () => <AddSubscriber />,
  },
];

export default routes;
