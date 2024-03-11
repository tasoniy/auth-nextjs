'use client'
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from "react-hot-toast"


export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user.email.length > 0 &&
      user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user]);

  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user);
      console.log(`Yxy: ${response.data}`)
      toast.success("YXY")
      router.push("/profile")
    }  catch (error: any) {
      console.log(`Login failed:${error.message}`)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex">
        <h1 className="text-center text-white text-2xl">Login</h1>
        <label htmlFor="username">User email</label>
        <input
          type="email"
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='user email'
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='user password'
        />
        <button onClick={onLogin}>Sign up</button>
        <Link href={'/signup'}> Sign here</Link>
      </div>

    </>
  )
}