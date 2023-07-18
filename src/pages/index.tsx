// si el usuario no esta autenticado mostrar login
// si el usuario esta autenticado mostrar formulario para crear un proyecto
// ver la lista de los ultimos 5 proyectos creado
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Login from "./login";



export default function Home() {
  //logica de react
  const [token, setToken] = useState("");

  const createProject = async () => {
    try {
      const { data } = await axios.post(process.env.NEXT_PUBLIC_API +"/projects", createProjectFrom, {
        headers: {
          token: token,
          Authorization: 'Bearer  ' + token,
        },
      });
      getProject();
      setCreateProjectFrom({
        img: "",
        name: "",
      });
      console.log(data);
      alert("projecto generado");
    } catch (error) {
      console.log(error);
    }
  };

  const [project, setProject] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    getProject();
  }, []);


  const [createProjectFrom, setCreateProjectFrom] = useState({
    name: "",
    img: "",
  });

  const getProject = async () => {
    try {
      const { data } = await axios.get(process.env.NEXT_PUBLIC_API + "/projects", {
        headers: {
          token: token,
        },
      });
      //  data = await data();
      setProject(data);

      console.log("Esta es mi data");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProjectFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateProjectFrom({
      ...createProjectFrom,
      [e.target.name]: e.target.value,
    });
  };

  if (token)
    return (
      <>
        <p>FORMULARIO DE CREAR PROYECTO</p>
        <div>
          <label>Nombre de proyecto</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => handleProjectFormChange(e)}
            name="name"
            value={createProjectFrom.name}
          />
          <label>url de la imagen</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => handleProjectFormChange(e)}
            name="img"
            value={createProjectFrom.img}
          />
          <button onClick={createProject}>create project</button>
        </div>

        <main className="container">
          <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
            <img
              className="me-3"
              src="/public/mrc.jpg"
              alt=""
              width="48"
              height="38"
            />
            <div className="lh-1">
              <h1 className="h6 mb-0 text-white lh-1">Bootstrap</h1>
              <small>Since 2011</small>
            </div>
          </div>

          <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0">Recent updates</h6>

            {project ? 
              project.map((e: any) => (
                  <div key={e?.id} className="d-flex text-body-secondary pt-3">
                    {/* <svg
                      className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                      width="32"
                      height="32"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: 32x32"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#007bff"></rect>
                      <text x="50%" y="50%" fill="#007bff" dy=".3em">
                        32x32
                      </text>
                    </svg> */}
                    <img src={e.img} width="32" height="32" alt="" />
                    <p className="pb-3 mb-0 small lh-sm border-bottom">
                      <strong className="d-block text-gray-dark">
                        {e?.name}
                      </strong>
                      Some representative placeholder content, with some
                      information about this user. Imagine this being some sort
                      of status update, perhaps?
                    </p>
                  </div>
                ))
              : ""}

            <small className="d-block text-end mt-3">
              <a href="#">All updates</a>
            </small>
          </div>
        </main>

        {project ? 
              project.map((e: any) => (
        <div  className="accordion" id="accordionExample">
  <div key={e?.id} className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>{e?.name}</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
        </div>
        ))
        : ""}
      </>
    );

  return (
        <Login /> 
  );
}
 
// https://github.com/fullstack3r/admin-panel-next/blob/main/src/pages/index.tsx
