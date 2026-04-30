import api from "./axiosInstance";

export const register = (email: string, password: string) =>
  api.post("/register", { email, password });

export const login = (email: string, password: string) =>
  api.post("/login", { email, password });

export const getProfile = () => api.get("/profile");
