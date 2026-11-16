import axios from "axios";

const API_URL = "http://localhost:6767/api/food";

export const getAllFood = () => axios.get(API_URL);

export const insertFood = (food) => axios.post(API_URL, food);

export const updateFood = (id, food) =>
  axios.put(`${API_URL}/${id}`, food);

export const deleteFood = (id) =>
  axios.delete(`${API_URL}/${id}`);