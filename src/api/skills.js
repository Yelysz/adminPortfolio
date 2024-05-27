import axios from "./axios.js";

export const getSkillsRequest = () => axios.get(`/skills`);
export const getSkillRequest = (id) => axios.get(`/skills/${id}`);
export const createSkillRequest = (skill) =>
  axios.post(`/skills`, skill, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateSkillRequest = (id, skill) =>
  axios.put(`/skills/${id}`, skill, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteSkillRequest = (id) => axios.delete(`/skills/${id}`);
