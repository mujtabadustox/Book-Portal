import axios from "axios";

const baseUrl = "/api/books";

const getAll = () => {
  return axios.get(baseUrl);
};

const getById = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const removeBook = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const bookService = { getAll, create, removeBook, update, getById };
export default bookService;
