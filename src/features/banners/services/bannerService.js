import apiClient from "../../../services/apiClient";

const getAll = async (params = {}, signal) => {
  const response = await apiClient.get("/admin/banners", {
    params,
    signal,
    skipGlobalLoading: true,
  });

  return response.data;
};

const create = async (formData) => {
  const response = await apiClient.post("/admin/banners", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export default { getAll, create };
