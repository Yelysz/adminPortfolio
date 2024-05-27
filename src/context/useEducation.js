import { createContext, useContext } from "react";

const EducationContext = createContext();

const useEducation = () => {
  const context = useContext(EducationContext);
  if (!context) throw new Error("useEducation must be used within a SkillProvider");
  return context;
};

export { EducationContext, useEducation };
