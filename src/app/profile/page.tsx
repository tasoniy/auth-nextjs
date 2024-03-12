'use client'
import React from "react"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function Profile() {
  const router = useRouter()
  const logout = async() => {
    try {
      await axios.get('/api/users/logout')
      toast.success("Logout succsessful")
      router.push('/login')
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <>
      <h1>Profile</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}