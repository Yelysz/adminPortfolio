import axios from "./axios.js";

export const getEducationsRequest = () => axios.get(`/educations`);
export const getEducationRequest = (id) => axios.get(`/educations/${id}`);
export const createEducationRequest = (education) =>
  axios.post(`/educations`, education);
export const updateEducationRequest = (id, education) =>
  axios.put(`/educations/${id}`, education);
export const deleteEducationRequest = (id) => axios.delete(`/educations/${id}`);
