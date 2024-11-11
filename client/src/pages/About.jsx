import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-3 text-center">
        <div >
          <h1 className="text-3xl font font-semibold text-center my-7">
            Sobre FOROPOST
            </h1>
          <div className="text-md text-gray-500 dark:text-gray-400 flex flex-col gap-6">
            <p>
              FOROPOST es un proyecto realizado por Acxel Fernando Montoya Silva
              como un proyecto para la asignatura Programación Web 2 en la
              Licenciatura En Multimedia y Animación Digital de la Facultad de
              Ciencias Físico Matemáticas de la Universidad Autónoma de Nuevo
              León.
            </p>
            <p>
              Este proyecto es una aplicación web tipo foro-blog para postear
              artículos, opiniones, o preguntar sobre temas en específico.
              Gracias por visitar este blog, toda retroalimentación y
              recomendación para mejorar es bienvenida! :D
            </p>
            <p>Proyecto MERN usando Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
