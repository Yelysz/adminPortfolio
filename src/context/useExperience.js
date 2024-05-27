import { createContext, useContext } from "react";

const ExperienceContext = createContext();

const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience must be used within a SkillProvider");
  return context;
};

export { ExperienceContext, useExperience };
