import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Por favor llene los espacios vacios");
    }

    if (!validateEmail(formData.email)) {
      return setErrorMessage(
        "Por favor ingrese un email en el formato correcto"
      );
    }

    if (!validatePassword(formData.password)) {
      return setErrorMessage(
        "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial."
      );
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(
          "El nombre de usuario y/o correo electrónico ya han sido registrados"
        );
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-rose-500 via-rose-500 to-yellow-300 rounded-lg text-white dark:from-purple-500 dark:to-blue-600">
              FOROPOST
            </span>
          </Link>
          <p className="text-sm mt-5">
            Crea posts y compártelos con tus amigos y comunidades. Comenta y
            dialoga sobre temas de tu interés.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Usuario" />
              <TextInput
                type="username"
                placeholder="Nombre de usuario"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Correo" />
              <TextInput
                type="email"
                placeholder="nombre@compañia.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Contraseña" />
              <TextInput
                type="password"
                placeholder="Contraseña"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="pinkToOrange"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Cargando...</span>
                </>
              ) : (
                "Registrarse"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Ya tienes cuenta?</span>
            <Link to="/sign-in" className="text-blue-500">
              Ingresar
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
