'use client'

import React from "react";

interface UserProfileProps {
  params: any
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <>
      <h2>Profile name id {params.id}</h2>
    </>
  )
}