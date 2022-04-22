import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Dashboard from '../pages/dashboard';
import Posts from '../pages/posts';
import PostsDetail from '../pages/posts/detail';
import Users from '../pages/users';
import UserDetail from '../pages/users/detail';

import Page404 from '../pages/404'

import Login from '../pages/login';
import MainLayout from '../layout/main';
import { AuthProvider } from '../auth/authProvider'
import store from '../state/store';
import { Provider } from 'react-redux'

const Routers = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/posts" element={<Posts/>}/>
              <Route path="/posts/:id" element={<PostsDetail/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/users/:id" element={<UserDetail/>}/>

            </Route>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      </Provider>
      
  </AuthProvider>
  )
}

export default Routers