import { useEffect, useState } from "react";
import { SkillContext } from "./useSkill.js";
import PropTypes from "prop-types";
import {
  getSkillsRequest,
  createSkillRequest,
  getSkillRequest,
  updateSkillRequest,
  deleteSkillRequest,
} from "../api/skills.js";

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [skillToDeleteId, setSkillToDeleteId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
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

  const getSkills = async () => {
    try {
      const res = await getSkillsRequest();
      // console.log(res.data);
      setSkills(res.data);
      setAlertMessage({
        type: "success",
        text: "Skills get successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get Skills." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const createSkill = async (skill) => {
    try {
      const res = await createSkillRequest(skill);
      setSkills((prevSkills) => [...prevSkills, res.data]);
      setAlertMessage({
        type: "success",
        text: "Skill create successfully!",
      });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to create Skill." });
      console.error("Error creating project:", error.response);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const deleteSkill = (id) => {
    setSkillToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteSkill = async () => {
    try {
      const res = await deleteSkillRequest(skillToDeleteId);
      if (res.status === 204) {
        setSkills(skills.filter((skill) => skill._id !== skillToDeleteId));
        setAlertMessage({
          type: "success",
          text: "Skill deleted successfully!",
        });
      }
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to delete skill." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    } finally {
      setSkillToDeleteId(null);
      setShowDeleteConfirmation(false);
    }
  };

  const getSkill = async (id) => {
    try {
      const res = await getSkillRequest(id);
      setAlertMessage({
        type: "success",
        text: "Skill get successfully!",
      });
      return res.data;
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to get Skills." });
      console.log(error);
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const updateSkill = async (id, project) => {
    {
      try {
        await updateSkillRequest(id, project);
        setAlertMessage({
          type: "success",
          text: "Skill update successfully!",
        });
      } catch (error) {
        setAlertMessage({ type: "error", text: "Failed to update Skill." });
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
    <SkillContext.Provider
      value={{
        skills,
        alertMessage,
        getSkills,
        createSkill,
        getSkill,
        updateSkill,
        confirmDeleteSkill,
        deleteSkill,
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
          <p>Are you sure you want to delete this skill?</p>
          <div>
            <button onClick={confirmDeleteSkill}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </SkillContext.Provider>
  );
};

SkillProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SkillContext;
