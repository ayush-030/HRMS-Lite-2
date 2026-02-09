import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-2-4xrt.onrender.com",
});

export default API;