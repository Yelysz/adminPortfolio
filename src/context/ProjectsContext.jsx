import { useEffect, useState } from "react";
import {
  getProjectsRequest,
  createProjectRequest,
  deleteProjectRequest,
  getProjectRequest,
  updateProjectRequest,
} from "../api/projects.js";
import { ProjectContext } from "./useProjects.js";
import PropTypes from "prop-types";

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [projectToDeleteId, setProjectToDeleteId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000); // Ocultar la alerta después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    if (errors?.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getProjects = async () => {
    try {
      const res = await getProjectsRequest();
      // console.log(res.data);
      setProjects(res.data);
      setAlertMessage({
        type: "success",
        text: "Projects get successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get projects." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const createProject = async (project) => {
    try {
      // console.log("Creating project with data:", project);
      const res = await createProjectRequest(project);
      setProjects((prevProjects) => [...prevProjects, res.data]);
      setAlertMessage({
        type: "success",
        text: "Project create successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to create project." });
      console.error("Error creating project:", error.response);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const deleteProject = (id) => {
    setProjectToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteProject = async () => {
    try {
      const res = await deleteProjectRequest(projectToDeleteId);
      if (res.status === 204) {
        setProjects(
          projects.filter((project) => project._id !== projectToDeleteId)
        );
        setAlertMessage({
          type: "success",
          text: "Project deleted successfully!",
        });
      }
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to delete project." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    } finally {
      setProjectToDeleteId(null);
      setShowDeleteConfirmation(false);
    }
  };

  const getProject = async (id) => {
    try {
      const res = await getProjectRequest(id);
      setAlertMessage({
        type: "success",
        text: "Project get successfully!",
      });
      return res.data;
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get projects." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const updateProject = async (id, project) => {
    {
      try {
        await updateProjectRequest(id, project);
        setAlertMessage({
          type: "success",
          text: "Projects update successfully!",
        });
      } catch (error) {
        setAlertMessage({ type: "error", text: "Failed to update projects." });
        console.log(error);
        const errorsMessage = error.response.data.error;
        const errorMessage = error.response.data.message;
        setErrors(
          Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]
        );
      }
    }
  };
  return (
    <ProjectContext.Provider
      value={{
        projects,
        alertMessage,
        getProjects,
        createProject,
        deleteProject,
        getProject,
        updateProject,
        confirmDeleteProject,
      }}
    >
      {children}

      {errors && (
        <div className="errorContainer">
          {errors.map((error, i) => (
            <div className="error" key={i}>
              <errors /> {error}
            </div>
          ))}
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this project?</p>
          <div>
            <button onClick={confirmDeleteProject}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProjectContext;
