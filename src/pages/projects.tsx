import styles from "../styles/Home.module.css";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

export default function Projects(props: any) {
  const {token} = props;
  // const [token, setToken] = useState("");
  const [project, setProject] = useState([]);
  const [createProjectFrom, setCreateProjectFrom] = useState({
    name: "",
    img: "",
  });

  const handleProjectFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateProjectFrom({
      ...createProjectFrom,
      [e.target.name]: e.target.value,
    });
  };

  const getProject = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API + "/projects",
        {
          headers: {
            token: token,
          },
        }
      );
      //  data = await data();
      setProject(data);

      console.log("Esta es mi data");
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async () => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API + "/projects",
        createProjectFrom,
        {
          headers: {
            token: token,
            Authorization: "Bearer  " + token,
          },
        }
      );
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

  useEffect(() => {
    // const storedToken = localStorage.getItem("token");
    // if (storedToken) {
    //   // setToken(storedToken);
    // }
    getProject();
  }, []);

  return (
    <div>
      <div className="container my-3 p-3 bg-body rounded shadow-sm col-md-12">
        <p>FORMULARIO DE CREAR PROYECTO</p>
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
            src="https://pbs.twimg.com/profile_images/1557851318752055303/qqsmYn3Y_400x400.jpg"
            alt=""
            width="38"
            height="38"
          />
          <div className="lh-1">
            <h1  className="h6 mb-0 text-black lh-1">Bootstrap</h1>
            <small>Since 2011</small>
          </div>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm col-md-12">
          <h6 className="border-bottom pb-2 mb-0">Recent updates</h6>

          {project
            ? project.map((e: any) => (
                <div key={e?.id} className="d-flex text-body-secondary pt-3">
                  <img src={e.img} width="32" height="32" alt="" />
                  <p className="pb-3 mb-0 small lh-sm border-bottom">
                    <strong className="d-block text-gray-dark">
                      {e?.name}
                    </strong>
                    Some representative placeholder content, with some
                    information about this user. Imagine this being some sort of
                    status update, perhaps?
                  </p>
                </div>
              ))
            : ""}

          <small className="d-block text-end mt-3">
            <a href="#">All updates</a>
          </small>
        </div>
      </main>
    </div>
  );
}
