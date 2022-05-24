import React from 'react'
import { useOutlet } from 'react-router-dom'
export default function Profile() {
  const outlet = useOutlet()
  return (
      <>
      <div>Profile</div>
       {outlet}
    </>
  )
}
