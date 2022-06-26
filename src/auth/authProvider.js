import React, { useState, useMemo, useEffect } from 'react'
import {
    useLocation,
    Navigate,
    useNavigate
  } from "react-router-dom";
import request from '../utils/request';
import { keyAuthorization } from '../constants/localStorage'
import { CircularProgress } from '@mui/material';
const authProvider = {
    isAuthenticated: false,
    async signin(callback) {
      try {
        await request({
          url:'/user/my-info',
          method: 'GET',
        })
        authProvider.isAuthenticated = true;
        callback()
      } catch (error) {
        authProvider.isAuthenticated = false;  
      }
    },
    signout(callback) {
      authProvider.isAuthenticated = false;
      callback()
      // localStorage.removeItem(keyAuthorization)
    },
};
export const AuthContext = React.createContext({});


export const AuthProvider = props => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)
  // const navigate = useNavigate()
    useEffect(() => {
      (async () => {
        try {
          const user = await request({
            url: '/user/my-info',
            method: 'GET'
          })
          setUser(user)
          setLoading(false)
        } catch (error) {
          setLoading(false)
        }
      })()
      return () =>{
        console.log("Provider unmount")
      }
    }, [])

    // useEffect(() =>{
    //   if(!user) {
    //     navigate('/login')
    //   }
    // }, [user])

    const signin = (newUser, callback) => {
      return authProvider.signin(() => {
        setUser(newUser);
        callback();
      });
    };
  
    const signout = (callback) => {
      setUser(null);
      localStorage.removeItem('jwt')
      callback();
    };
  
    const value = { user, signin, signout };
    console.log("value", value)
    if (isLoading) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <CircularProgress />
        </div>
    )
    }
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
  
  
  
  
  export function RequireAuth(props) {
    const auth = useAuth();
    let location = useLocation();
    console.log("auth", auth)
    if (!auth.user || auth.user.role !== 'admin') {
     
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return props.children;
  }