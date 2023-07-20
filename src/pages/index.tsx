// si el usuario no esta autenticado mostrar login
// si el usuario esta autenticado mostrar formulario para crear un proyecto
// ver la lista de los ultimos 5 proyectos creado
import {useEffect, useState } from "react";
import Login from "./login";
import Projects from "./projects";

export default function Home() {
  //logica de react
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (token)
    return (
      <Projects token={token} />
    );

  return <Login />;
}

// https://github.com/fullstack3r/admin-panel-next/blob/main/src/pages/index.tsx
