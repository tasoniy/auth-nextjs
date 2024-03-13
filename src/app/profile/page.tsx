'use client'
import React, { useState } from "react"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function Profile() {
  const [data, setData] = useState('')
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("Logout succsessful")
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    // try {
      const response = await axios.get('/api/users/user');
      console.log(response.data);
      setData(response.data.currentUser._id)
    // } catch (error) {

    // }
  }
  return (
    <>
      <h1>Profile</h1>
      <h2>
      {
        data === ''? 'nothing' :
        <Link href={`/profile/${data}`}>{data}</Link>
      }
      </h2>
      <button onClick={getUserDetails}>GetDetails</button>
      <button onClick={logout}>Logout</button>
    </>
  )
}