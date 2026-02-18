import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center text-4xl'>Loading... <Loader className='animate-spin' /></div>
  )
}
