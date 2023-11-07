import React from 'react'
import { quantum } from 'ldrs'


// Default values shown

export default function Loading() {
quantum.register()

  return (
    <div className=' flex w-full justify-center items-center h-full min-h-[80vh]'>
        <l-quantum
  size="100"
  speed="1.75" 
  color="white" 
></l-quantum>
    </div>
  )
}
