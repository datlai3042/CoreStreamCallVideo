'use client'
import React, { useContext } from 'react'
import { CallContext } from '../../providers'

const ButtonShareScreen = () => {
  const {handleEvent} = useContext(CallContext)
  return (
    <button onClick={handleEvent?.onShareScreen}>ButtonShareScreen</button>
  )
}

export default ButtonShareScreen