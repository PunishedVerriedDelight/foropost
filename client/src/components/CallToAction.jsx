import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl font-semibold'>
                ¿Te interesa estudiar una carrera?
            </h2>
            <p className='text-gray-500 dark:text-gray-400 my-2'>
                Checa las carreras que ofrece la Universidad Autónoma de Nuevo León
            </p>
            <Button gradientDuoTone='purpleToPink' size='sm' className='rounded-tl-xl rounded-bl-none mt-1'>
                <a href='https://www.uanl.mx/' target='_blank' rel='noopener noreferrer'>
                    Learn More
                </a>
            </Button>
        </div>
        <div className="p-4 flex-1">
            <img src="https://vidauniversitaria.uanl.mx/wp-content/uploads/2021/08/foto-torre-rectoria-4.jpg" />
        </div>
    </div>
  )
}
