import axios from "axios";

axios.defaults.withCredentials = true;

export const apiService = axios.create({
  baseURL: "https://backend-final-project-fcdf.onrender.com",
  withCredentials: true,
});

//https://backend-final-project-fcdf.onrender.com

export const getDataAPI = async (url, token) => {
  const res = await apiService.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await apiService.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await apiService.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await apiService.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await apiService.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
