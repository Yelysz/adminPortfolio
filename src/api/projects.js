import axios from "./axios.js";

export const getProjectsRequest = () => axios.get(`/projects`);
export const getProjectRequest = (id) => axios.get(`/projects/${id}`);
export const createProjectRequest = (project) =>
  axios.post(`/projects`, project, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateProjectRequest = (id, project) =>
  axios.put(`/projects/${id}`, project, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteProjectRequest = (id) => axios.delete(`/projects/${id}`);
