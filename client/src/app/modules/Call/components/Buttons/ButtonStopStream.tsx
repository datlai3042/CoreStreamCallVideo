'use client'
import React, { useContext } from 'react'
import { CallContext } from '../../providers'

const ButtonStopStream = () => {
  const {handleEvent} = useContext(CallContext)

  return (
    <button onClick={handleEvent?.onStopStream}>ButtonStopStream</button>
  )
}

export default ButtonStopStream