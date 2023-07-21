import styles from "../styles/Home.module.css";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

export default function Projects(props: any) {
  const { token } = props;
  // const [token, setToken] = useState("");
  const [project, setProject] = useState([]);
  const [createProjectFrom, setCreateProjectFrom] = useState({
    _id: "",
    name: "",
    img: "",
    description: "",
  });

  const handleProjectFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      let edit = false;
      if (createProjectFrom._id) {
        edit = true;
      }
      if (edit) {
        const { data } = await axios.put(
          process.env.NEXT_PUBLIC_API + "/projects/" + createProjectFrom._id,
          createProjectFrom,
          {
            headers: {
              token: token,
              Authorization: "Bearer " + token,
            },
          }
        );
      } else {
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

        setCreateProjectFrom({
          _id: "",
          img: "",
          name: "",
          description: "",
        });
      }

      getProject();
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = () => {
    setCreateProjectFrom({
      _id: "",
      img: "",
      name: "",
      description: "",
    });
    showModal();
  };

  const deleteProject = async (_id: string) => {
    const { data } = await axios.delete(
      process.env.NEXT_PUBLIC_API + "/projects/" + _id,
      {
        headers: {
          token: token,
          Authorization: "Bearer  " + token,
        },
      }
    );
    getProject();
  }

  const showModal = () => {
    const { Modal } = require("bootstrap");
    const myModal = new Modal("#exampleModal");

    myModal.show();
  };

  const editModal = (
    _id: string,
    name: string,
    img: string,
    description: string
  ) => {
    console.log(_id, name, img, description);
    setCreateProjectFrom({
      _id,
      img,
      name,
      description,
    });

    showModal();
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <div className="d-flex">
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
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
                <label>Descripcion</label>
                <textarea
                name="description"
                onChange={(e) => handleProjectFormChange(e)}
                className="form-control"
                value={createProjectFrom.description}
              ></textarea>
              </div>
              

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createProject}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
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
            <h1 className="h6 mb-0 text-black lh-1">Bootstrap</h1>
            <small className="text-black">Since 2011</small>
          </div>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm col-md-12">
          <h6 className="border-bottom pb-2 mb-0">Recent updates</h6>

          {project
            ? project.map((e: any) => (
                <div key={e?._id} className="d-flex text-body-secondary pt-3">
                  <div className="col-1">
                    <img src={e.img} width="32" height="32" alt="" />
                  </div>
                  <div className="col-10">
                    <p className="pb-3 mb-0 small lh-sm border-bottom">
                      <strong className="d-block text-gray-dark">
                        {e?.name}
                      </strong>
                      {e?.description}
                    </p>
                  </div>
                  
                  <div id="icon" className="col-1">
                    <i
                      onClick={() =>
                        editModal(e?._id, e?.name, e?.img, e?.description)
                      }
                      className="fa-solid fa-pen-to-square cursor-pointer"
                    ></i>
                    <i className="fa-solid fa-trash mx-2 cursor-pointer" onClick={()=> deleteProject(e?._id)}></i>
                  </div>
                </div>
              ))
            : ""}

          <button type="button" className="btn" onClick={newProject}>
            Crear proyecto
          </button>
        </div>
      </main>
    </div>
  );
}
