import axios, { AxiosInstance } from "axios";

// @ts-ignore
const baseURL: string = import.meta.env.VITE_API_URL;

const instance: AxiosInstance = axios.create({ baseURL, timeout: 10000 });

export default instance;
