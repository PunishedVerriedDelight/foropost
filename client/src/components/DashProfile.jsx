import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Perfil</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt="usuario" className='rounded-full w-full h-full object-cover border-4 border-[lightgray] dark:border-slate-700'/>
        </div>
        <TextInput type='text' id='username' placeholder='Nombre de usuario' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='Correo electrónico' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='Contraseña' />
        <Button type='submit' gradientMonochrome="teal" outline>
          Actualizar datos
        </Button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Eliminar Cuenta</span>
        <span className='text-slate-600 dark:text-slate-300 cursor-pointer'>Cerrar Sesión</span>
      </div>
    </div>
  )
}
