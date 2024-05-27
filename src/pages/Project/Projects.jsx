// Projects.js
import { useEffect, useState } from "react";
import { useProjects } from "../../context/useProjects.js";
import { Link } from "react-router-dom";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaGithub,
  FaDesktop,
  FaFolderPlus,
} from "react-icons/fa";
import ImageModal from "../../components/home/ImageModal.jsx";
import "./Projects.css";

const Projects = () => {
  const { getProjects, projects, deleteProject, alertMessage } = useProjects();
  const [hasFetched, setHasFetched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!hasFetched) {
      getProjects();
      setHasFetched(true);
    }
  }, [getProjects, hasFetched]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <main className="container-project">
      {alertMessage && (
          <div className={`alert ${alertMessage.type}`}>
            {alertMessage.text}
          </div>
        )}
        <h1>Projects</h1>
        <div className="container-btn-create">
          <Link className="btn-create" to={"/createProject"}>
            <FaFolderPlus className="icon" /> Create New 
          </Link>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
              {/* <th>ID</th> */}
                <th className="th-no">#</th>
                <th className="th-title">Title</th>
                <th>Description</th>
                <th>Tags</th>
                <th>GitHub</th>
                <th>Web</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                {/* <td>{project._id}</td> */}
                  <td className="center-aligned">{index + 1}</td>
                  <td className="td-title">
                    <div>
                      {project.image?.secure_url && (
                        <img
                          src={project.image?.secure_url}
                          alt={project.title}
                          width="100"
                          onClick={() => openModal(project.image?.secure_url)}
                        />
                      )}

                      {project.title}
                    </div>
                  </td>
                  <td>{project.description}</td>
                  <td className="td-tags">
                    <div>
                      <ul>
                        {project.tags.map((tag, i) => (
                          <li className="center-aligned" key={i}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td className="center-aligned td-link">
                    <nav>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                      </a>
                    </nav>
                  </td>
                  <td className="center-aligned td-link">
                    <nav>
                      <a
                        href={project.web}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaDesktop />
                      </a>
                    </nav>
                  </td>
                  <td className="center-aligned actions">
                    <nav>
                      <Link to={`/updateProject/${project._id}`}>
                        <FaPencilAlt />
                      </Link>
                      <button onClick={() => {deleteProject(project._id)}}>
                        <FaTrashAlt />
                      </button>
                    </nav>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
    </>
  );
};

export default Projects;
