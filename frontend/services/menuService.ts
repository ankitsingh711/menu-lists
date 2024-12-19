import axios from "axios";

const API_URL = "http://localhost:3001/menu";

export const fetchMenus = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMenu = async (data: any) => {
  return axios.post(API_URL, data);
};

export const updateMenu = async (id: string, data: any) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteMenu = async (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};
