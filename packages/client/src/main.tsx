import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {App} from './App';

import {AdminPage} from '@pages/AdminPage';
import {HomePage} from '@pages/HomePage';
import {AuthPage} from '@pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {path: '/admin', element: <AdminPage />},
  {path: '/login', element: <AuthPage isLogin />},
  {path: '/signup', element: <AuthPage isLogin={false} />},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>,
);
