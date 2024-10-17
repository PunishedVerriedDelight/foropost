import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsTwitterX, BsGithub, BsDiscord} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-cyan-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-around sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl 
                    font-semibold dark:text-white"
            >
              <span
                className="px-2 py-1 bg-gradient-to-r from-rose-500 via-rose-500 to-yellow-300 rounded-lg text-white dark:from-purple-500 dark:to-blue-600"
              >
                FOROPOST
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Sobre" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.fcfm.uanl.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FCFM
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Foropost
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Siguenos en" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/PunishedVerriedDelight/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="discordapp.com/usuarios/cxlea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Información Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.uanl.mx/aviso-de-privacidad/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Politicas de privacidad
                </Footer.Link>
                <Footer.Link
                  href="http://transparencia.uanl.mx/normatividad_vigente/leyesYreg.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terminos y condiciones
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              href="#"
              by="FOROPOST"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-3 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="https://www.facebook.com/?locale=es_LA" icon={BsFacebook}/>
                <Footer.Icon href="https://x.com/?lang=es" icon={BsTwitterX}/>
                <Footer.Icon href="https://github.com/PunishedVerriedDelight/" icon={BsGithub}/>
            </div>
          </div>
      </div>
    </Footer>
  );
}
