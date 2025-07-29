import API from "./axios";

export const createTeam = (name, userId) =>
  API.post("/teams/create", { name, userId });
export const addMember = (teamId, userId) =>
  API.post("/teams/add-member", { teamId, userId });
export const createTask = (data) => API.post("/teams/task", data);
export const getTasks = (params) => API.get("/teams/tasks", { params });
