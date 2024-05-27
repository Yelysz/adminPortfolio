import { useEffect, useState } from "react";
import { ExperienceContext } from "./useExperience.js";
import PropTypes from "prop-types";
import {
  getExperienceRequest,
  getExperiencesRequest,
  createExperienceRequest,
  updateExperienceRequest,
  deleteExperienceRequest,
} from "../api/experience.js";

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [experienceToDeleteId, setExperienceToDeleteId] = useState(null);
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

  const getExperiences = async () => {
    try {
      const res = await getExperiencesRequest();
      // console.log(res.data);
      setExperiences(res.data);
      setAlertMessage({
        type: "success",
        text: "Experience get successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get experience." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const createExperience = async (experience) => {
    try {
      // console.log("Creating project with data:", project);
      const res = await createExperienceRequest(experience);
      setExperiences((prevExperiences) => [...prevExperiences, res.data]);
      setAlertMessage({
        type: "success",
        text: "Experience create successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to create experience." });
      console.error("Error creating project:", error.response);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const deleteExperience = (id) => {
    setExperienceToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteExperience = async () => {
    try {
      const res = await deleteExperienceRequest(experienceToDeleteId);
      if (res.status === 200) {
        setExperiences(
          experiences.filter(
            (experience) => experience._id !== experienceToDeleteId
          )
        );
        setAlertMessage({
          type: "success",
          text: "Experience deleted successfully!",
        });
      }
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to delete experience." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    } finally {
      setExperienceToDeleteId(null);
      setShowDeleteConfirmation(false);
    }
  };

  const getExperience = async (id) => {
    try {
      const res = await getExperienceRequest(id);
      setAlertMessage({
        type: "success",
        text: "Experience get successfully!",
      });
      return res.data;
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get experience." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const updateExperience = async (id, experience) => {
    {
      try {
        await updateExperienceRequest(id, experience);
        setAlertMessage({
          type: "success",
          text: "Experience update successfully!",
        });
      } catch (error) {
        setAlertMessage({
          type: "error",
          text: "Failed to update experience.",
        });
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
    <ExperienceContext.Provider
      value={{
        experiences,
        alertMessage,
        createExperience,
        updateExperience,
        getExperience,
        getExperiences,
        deleteExperience,
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
          <p>Are you sure you want to delete this experience?</p>
          <div>
            <button onClick={confirmDeleteExperience}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </ExperienceContext.Provider>
  );
};

ExperienceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExperienceContext;
