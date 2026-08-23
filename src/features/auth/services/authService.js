import apiClient from "../../../services/apiClient";
const login = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

const authService = {
  login,
  getCurrentUser,
  logout,
};

export default authService;
