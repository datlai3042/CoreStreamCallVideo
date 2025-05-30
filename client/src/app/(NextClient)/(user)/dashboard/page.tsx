import { generateCookiesAuth } from '@/app/utils/authentication.util'
import { cookies } from 'next/headers'
import React from 'react'

const DashboardPage = () => {
  const cookies = generateCookiesAuth()
  console.log({cookies})
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage