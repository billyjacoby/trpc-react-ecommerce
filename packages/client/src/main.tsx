import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {App} from './App';

import {ItemsPage} from '@pages/ItemsPage';
import {HomePage} from '@pages/HomePage';
import {AuthPage} from '@pages/AuthPage';

export const ROUTES = [
  {
    path: '/',
    element: <HomePage />,
    displayName: 'Home',
  },
  {path: '/items', element: <ItemsPage />, displayName: 'Items'},
  {path: '/login', element: <AuthPage isLogin />},
  {path: '/signup', element: <AuthPage isLogin={false} />},
];

const router = createBrowserRouter(ROUTES);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>,
);
