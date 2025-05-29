'use client'
import React, { useContext } from 'react'
import { CallContext } from '../../providers'

const ButtonWebCam = () => {
  const {handleEvent} = useContext(CallContext)

  return (
    <button onClick={handleEvent?.onWebcam}>ButtonWebCam</button>
  )
}

export default ButtonWebCam