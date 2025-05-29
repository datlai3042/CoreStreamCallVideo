'use client'
import React, { useContext } from 'react'
import { CallContext } from '../../providers'

const ButtonCall = () => {
  const {handleEvent} = useContext(CallContext)

  return (
    <button onClick={handleEvent?.onCall}>ButtonCall</button>
  )
}

export default ButtonCall