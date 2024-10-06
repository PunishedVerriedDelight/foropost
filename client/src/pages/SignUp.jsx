import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-orange-500
            to-yellow-300 rounded-lg text-white"
            >
              FOROPOST
            </span>
          </Link>
          <p className="text-sm mt-5">
            Crea posts y compartelos con tus amigos y comunidades. Comenta y
            dialoga sobre temas de tu interes.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value="Usuario" />
              <TextInput type="text" placeholder="Nombre de usuario" id="username"/>
            </div>
            <div>
              <Label value="Correo" />
              <TextInput type="text" placeholder="nombre@compañia.com" id="username"/>
            </div>
            <div>
              <Label value="Contraseña" />
              <TextInput type="text" placeholder="Contraseña" id="username"/>
            </div>
            <Button gradientDuoTone='pinkToOrange' type="submit">
              Registrarse
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Ya tienes cuenta?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
