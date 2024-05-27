import { createContext, useContext } from "react";

const SkillContext = createContext();

const useSkill = () => {
  const context = useContext(SkillContext);
  if (!context) throw new Error("useSkill must be used within a SkillProvider");
  return context;
};

export { SkillContext, useSkill };
