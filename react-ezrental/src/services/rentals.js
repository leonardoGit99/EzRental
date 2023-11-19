import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";

export const createRental = async (body, id, idUser) => {
  const response = await axios.post(`${api}/rent/${id}/${idUser}`, JSON.stringify(body), { headers });
  return response;
}
