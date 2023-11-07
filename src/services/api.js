import axios from "axios";
import { getToken } from "./auth";

export const baseURL='http://localhost:3333/api/v1'

const api = axios.create({
  baseURL,
  'Access-Control-Allow-Origin': '*', // Allow requests from all origins
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
});


export default api;