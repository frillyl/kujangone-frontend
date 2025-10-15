import axios from "axios";

const API_URL = "http://localhost:5000/api/anggota";

export const getAnggota = () => axios.get(API_URL);
export const addAnggota = (data) => axios.post(API_URL, data);
export const updateAnggota = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteAnggota = (id) => axios.delete(`${API_URL}/${id}`);