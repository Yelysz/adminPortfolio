import axios from "./axios.js";

export const getExperiencesRequest = () => axios.get(`/experiences`);
export const getExperienceRequest = (id) => axios.get(`/experiences/${id}`);
export const createExperienceRequest = (experience) =>
  axios.post(`/experiences`, experience);
export const updateExperienceRequest = (id, experience) =>
  axios.put(`/experiences/${id}`, experience);
export const deleteExperienceRequest = (id) =>
  axios.delete(`/experiences/${id}`);
