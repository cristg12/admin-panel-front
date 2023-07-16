import styles from "../styles/Home.module.css";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

export default function Login(){
const [sessionToken, setSessionToken] = useState("");
const [token, setToken] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const getProject = async () => {
    try {
      const { data } = await axios.get("/api/projects", {
        headers: {
          token: sessionToken,
        },
      });
      //  data = await data();
      setProject(data.data);

      console.log("Esta es mi data");
    } catch (error) {
      console.log(error);
    }
  };

const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
  // ... -> spread operator -> sirve para copiar el valor previo de la variable seleccionada
  setLoginForm({
    ...loginForm,
    [e.target.name]: e.target.value,
  });
};

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }
  getProject();
}, []);

const [createProjectFrom, setCreateProjectFrom] = useState({
  projectName: "",
  imageUrl: "",
});

const handleProjectFormChange = (e: ChangeEvent<HTMLInputElement>) => {
  setCreateProjectFrom({
    ...createProjectFrom,
    [e.target.name]: e.target.value,
  });
};

const createProject = async () => {
  try {
    const { data } = await axios.post("/api/project", createProjectFrom, {
      headers: {
        token: sessionToken,
      },
    });
    setCreateProjectFrom({
      imageUrl: "",
      projectName: "",
    });
    console.log(data);
    alert("projecto generado");
  } catch (error) {
    console.log(error);
  }
};

const [project, setProject] = useState([]);
function refrescarPagina() {
  location.reload();
}

const handleSubmit = async () => {
  if (loginForm.username.length <= 0)
    return alert("el username no puede estar vacio");
  if (loginForm.password.length <= 0)
    return alert("el password no puede estar vacio");

  try {
    const { data } = await axios.post("/api/login", loginForm);
    // data nos retornara si el login ha sido correcto y un token de sesion de ser asi
    console.log(data);
    localStorage.setItem("token", data.token);
    setLoginForm({
      password: "",
      username: "",
    });
    
    setIsLoggedIn(true);
    setSessionToken(data.token);
    getProject();
    refrescarPagina();
  } catch (error) {
    alert(error);
  }
};

 
  return(
    <div className={styles.loginContainer}>
        <h2>Login</h2>
        <div className={styles.loginFormContainer}>
          <label>username</label>
          
          <input
            type="text"
            name="username"
            onChange={(e) => handleFormChange(e)}
            value={loginForm.username}
          />
          <label> password</label>
          <input
            type="password"
            name="password"
            id=""
            value={loginForm.password}
            onChange={(e) => handleFormChange(e)}
          />
          <button className="btn btn-primary"  onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div> 
  )
 }

