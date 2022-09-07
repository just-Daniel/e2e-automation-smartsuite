import { request } from "undici";
import {
  headerRequest,
  urlCreateSolution,
} from "../../constants/default-params";
import { config } from "../../infrastructure/config";

export const getAllSolutions = async (accessToken: string) => {
  const res = await request(urlCreateSolution(), {
    method: "GET",
    headers: headerRequest(accessToken, config().accountID),
  });
  return await res.body.json();
};
