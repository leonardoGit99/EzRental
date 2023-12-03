import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";

export const createReviewResidence = async (body, idResid, idUser) => {
  const response =  await axios.post(`${api}/evalu/${idResid}/${idUser}`, JSON.stringify(body), { headers });
  return response.data;
}

export const getAllReviewsByResidence = async (id) =>{
  const response = await axios.get(`${api}/evalu/${id}`);
  return response.data;
}