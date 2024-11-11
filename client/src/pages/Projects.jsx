import React from 'react'
import CallToAction from '../components/CallToAction'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-3'>
      <h1 className='text-3xl font-semibold'>PIA</h1>
      <p className='text-md text-gray-500 dark:text-gray-400'>Acxel Fernando Montoya Silva</p>
      <p className='text-md text-gray-500 dark:text-gray-400'>Programacion Web 2</p>
      <p className='text-md text-gray-500 dark:text-gray-400'>LMAD</p>
      <p className='text-md text-gray-500 dark:text-gray-400'>FCFM</p>
      <p className='text-md text-gray-500 dark:text-gray-400'>UANL</p>
      <div className="p-4">
      <CallToAction />
      </div>
    </div>
  )
}
