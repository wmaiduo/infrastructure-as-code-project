'use client'

import { useState } from 'react'
import Cookies from 'universal-cookie'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

function Login() {

    const cookies = new Cookies()
    const [username, setUsername] = useState(cookies.get('username') || '')
    const [password, setPassword] = useState(cookies.get('password') || '')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loginError, setLoginError] = useState(false)

    function handleClick(e: any) {
        e.preventDefault()
        axios.post(`${apiConfig.url}/login`, {
            username: username,
            password: password
        }).then((res) => {
            if (res.data.success) {
                if (rememberMe) {
                    cookies.set('username', username, { path: '/', expires: new Date(Date.now() + 604800000) })
                    cookies.set('persistencetoken', res.data.token, { path: '/', expires: new Date(Date.now() + 604800000) })
                }
            } else {
                setLoginError(true)
        }}).catch((err) => {
            console.log(err)
            setLoginError(true)
        })
    }

    function handleUsernameChange(e: any) {
        setUsername(e.target.value)
        console.log(username)
        console.log(e)
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value)
    }

    function handleShowPassword(e: any) {
        setShowPassword(!showPassword)
    }

    function handleRememberMeChange(e: any) {
        setRememberMe(!rememberMe)
    }

    return (
        <div>
            {/* center horizontally and vertically*/}
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">
                        Welcome to the login page of the chat app <br />
                    </h1>
                    <h4 className="text-2l font-bold my-4">
                        Example User: Michael <br />
                        Example Password: password123!
                    </h4>
                    {/* username */}
                    <div className="w-1/2 flex justify-end items-center relative">
                        <input
                        placeholder="username"
                        className="border border-gray-400 rounded-lg p-4 w-full text-black"
                        onChange={handleUsernameChange}
                        value={username}
                        />
                    </div>
                    {/* password */}
                    <div className="w-1/2 flex justify-end items-center relative mt-0.5">
                        <input
                        placeholder="password"
                        className="border border-gray-400 rounded-lg p-4 w-full text-black"
                        onChange={handlePasswordChange}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        />
                        {/* show/hide password */}
                        {showPassword ? (
                            <div className="absolute right-0 mr-4">
                                <AiFillEye color="black" fontSize="1.5em" onClick={handleShowPassword}/>
                            </div>
                        ) : (
                            <div className="absolute right-0 mr-4">
                                <AiFillEyeInvisible color="black" fontSize="1.5em" onClick={handleShowPassword}/>
                            </div>
                        )}
                    </div>
                    {/* Login Button */}
                    <div className="w-1/8 flex justify-end items-center relative">
                        <button
                        className="border border-gray-400 rounded-lg p-2 w-full text-black bg-white mt-4"
                        onClick={handleClick}
                        >
                            <h2 className='text-2l font-bold'>Login</h2>
                        </button>
                    </div>
                    {/* Remember Me */}
                    <div className="flex justify-end items-center relative mt-1">
                        <input
                        type="checkbox"
                        className="border p-4 text-black bg-white mr-2"
                        onChange={handleRememberMeChange}
                        />
                        <h2 className='text-2 font-bold'>Remember Me</h2>
                    </div>
                    {/* Error Message */}
                    {
                        loginError ? (
                            <div className="flex justify-end items-center relative mt-1">
                                <h2 className='text-2 font-bold text-red-500'>Incorrect Username or Password</h2>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
