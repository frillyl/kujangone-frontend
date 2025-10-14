import axios from "axios";

const API_URL = "http://localhost:5000/api/karyawan";

export const getKaryawan = () => axios.get(API_URL);
export const addKaryawan = (data) => axios.post(API_URL, data);
export const updateKaryawan = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteKaryawan = (id) => axios.delete(`${API_URL}/${id}`);