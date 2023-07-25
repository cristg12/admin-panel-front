import styles from "../styles/Home.module.css";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import Projects from "./projects";

export default function Login(){
const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  

const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
  // ... -> spread operator -> sirve para copiar el valor previo de la variable seleccionada
  setLoginForm({
    ...loginForm,
    [e.target.name]: e.target.value,
  });
};

function refrescarPagina() {
  location.reload();
}

const handleSubmit = async () => {
  if (loginForm.email.length <= 0)
    return alert("el email no puede estar vacio");
  if (loginForm.password.length <= 0)
    return alert("el password no puede estar vacio");

  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_API + "/auth/login", loginForm);
    // data nos retornara si el login ha sido correcto y un token de sesion de ser asi
    console.log(data);
    localStorage.setItem("token", data.token);
    setLoginForm({
      password: "",
      email: "",
    });

    
    refrescarPagina();
  } catch (error) {
    alert(error);
  }
};

 
  return(
    <div className={styles.loginContainer}>
        <h2>Login</h2>
        <div className={styles.loginFormContainer}>
          <label>email</label>
          
          <input
            type="text"
            name="email"
            onChange={(e) => handleFormChange(e)}
            value={loginForm.email}
          />
          <label> password</label>
          <input
            type="password"
            name="password"
            id=""
            value={loginForm.password}
            onChange={(e) => handleFormChange(e)}
          />
          <button className="btn btn-primary"  onClick={handleSubmit}>Login</button>
        </div>
      </div> 
  )
 }

