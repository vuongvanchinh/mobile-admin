import React, {useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import Logo from '../../assets/logo.jpg'
import request from '../../utils/request'
import {
    useNavigate,
    useLocation,
} from "react-router-dom";
import { keyAuthorization } from '../../constants/localStorage'
import { useAuth } from '../../auth/authProvider';

const Login = () => {
    const auth = useAuth()
    console.log("🚀 ~ file: index.jsx ~ line 14 ~ Login ~ auth", auth)
    const [state, setState] = useState({
        email:'',
        password: '',
        isLoading: false
    });
    const navigate = useNavigate();
    const location = useLocation();
  
    let from = location.state?.from?.pathname || "/";
    console.log("🚀 ~ file: index.jsx ~ line 23 ~ Login ~ from", from)

    const onChange = (e) => {
        console.log(e)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!state.isLoading) {
            setState({
                ...state,
                isLoading: true
            })

            await request({
                url: '/user/login',
                method: 'POST',
                data: {
                    email: state.email,
                    password: state.password
                }
            }).then(data => {
                console.log(data)
                localStorage.setItem(keyAuthorization, 'Bearer ' + data.jwt)
                auth.signin(data.user, () => {
                    console.log("🚀 ~ file: index.jsx ~ line 51 ~ auth.signin ~ data.user", data.user)
                    // navigate(from, { replace: true });
                })
                
            }).catch(err => {
                console.log("🚀 ~ file: index.jsx ~ line 38 ~ onSubmit ~ err", err)
                localStorage.removeItem(keyAuthorization)
            }).finally(() => {
                setState({
                    ...state,
                    isLoading: false
                })
            }) 
            
        }

    }
    useEffect(() => {
        if (auth.user && auth.user.role === 'admin') {
            console.log("🚀 ~ file: index.jsx ~ line 68 ~ Login ~ auth.user", auth.user)
            
            navigate(from, { replace: true });
        }
    }, [auth, state.isLoading])
    

    return (
    <div className='flex items-center justify-center h-[100vh]'>
        <form className='w-[450px] gap-4 flex flex-col p-4 rounded-md bg-slate-300 shadow-md'>
            <img src={Logo} alt="logo" draggable={false}/>
            <TextField
                fullWidth
                type="email"
                id="email"
                label="Email"
                placeholder='admin@gmail.com'
                name='email'
                value={state.email}
                onChange={onChange}
            />

            <TextField
                fullWidth
                type="password"
                id="password"
                label="Password"
                name='password'
                value={state.password}
                onChange={onChange}
            />

            <Button 
                onClick={onSubmit} 
                disabled={state.isLoading}
                type="submit" variant='contained' 
                className='w-fit self-end'
            >
                Login
            </Button>
        </form>


    </div>
  )
}

export default Login