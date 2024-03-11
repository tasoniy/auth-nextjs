'use client'

import React from "react";

interface UserProfileProps {
  params: any
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <>
      <h2>Profile name {params.name}</h2>
      <p>id {params.id}</p>
    </>
  )
}