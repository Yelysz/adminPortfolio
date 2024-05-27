import { useEffect, useState } from "react";
import { EducationContext } from "./useEducation.js";
import PropTypes from "prop-types";
import {
  getEducationsRequest,
  getEducationRequest,
  createEducationRequest,
  updateEducationRequest,
  deleteEducationRequest,
} from "../api/education.js";

export const EducationProvider = ({ children }) => {
  const [educations, setEducations] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [educationToDeleteId, setEducationToDeleteId] = useState(null);
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

  const getEducations = async () => {
    try {
      const res = await getEducationsRequest();
      // console.log(res.data);
      setEducations(res.data);
      setAlertMessage({
        type: "success",
        text: "Education get successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get education." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const createEducation = async (education) => {
    try {
      // console.log("Creating project with data:", project);
      const res = await createEducationRequest(education);
      setEducations((prevEducations) => [...prevEducations, res.data]);
      setAlertMessage({
        type: "success",
        text: "Education create successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to create education." });
      console.error("Error creating project:", error.response);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const deleteEducation = (id) => {
    setEducationToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteEducation = async () => {
    try {
      const res = await deleteEducationRequest(educationToDeleteId);
      if (res.status === 200) {
        setEducations(
          educations.filter(
            (education) => education._id !== educationToDeleteId
          )
        );
        setAlertMessage({
          type: "success",
          text: "Education deleted successfully!",
        });
      }
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to delete education." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    } finally {
      setEducationToDeleteId(null);
      setShowDeleteConfirmation(false);
    }
  };

  const getEducation = async (id) => {
    try {
      const res = await getEducationRequest(id);
      setAlertMessage({
        type: "success",
        text: "Education get successfully!",
      });
      return res.data;
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get education." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const updateEducation = async (id, education) => {
    {
      try {
        await updateEducationRequest(id, education);
        setAlertMessage({
          type: "success",
          text: "Education update successfully!",
        });
      } catch (error) {
        setAlertMessage({ type: "error", text: "Failed to update education." });
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
    <EducationContext.Provider
      value={{
        educations,
        alertMessage,
        getEducation,
        getEducations,
        updateEducation,
        deleteEducation,
        createEducation,
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
            <button onClick={confirmDeleteEducation}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </EducationContext.Provider>
  );
};

EducationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EducationContext;
