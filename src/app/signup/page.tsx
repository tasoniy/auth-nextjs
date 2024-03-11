'use client'

import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from "react-hot-toast"

export default function SignUp() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user]);

  const router = useRouter();

  const onSignUp = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user);
      console.log(`Success: ${response.data}`);
      router.push('/login')
    } catch (error: any) {
      console.log(`Signup failedR:${error.message}`)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="flex">
        <h1 className="text-center text-white text-2xl">
          {loading ? "Waiting" : "Signup"}
        </h1>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id='username'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='user name'
        />
        <label htmlFor="username">User email</label>
        <input
          type="email"
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
        />
        <button
          onClick={onSignUp}
          disabled={buttonDisabled ? true : false}>
          {buttonDisabled ? "NOOOOO" : "Sign up"}
        </button>
        <Link href={'/login'}> Loginn here</Link>
      </div>

    </>
  )
}