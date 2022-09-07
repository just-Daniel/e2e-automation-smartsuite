import { CustomWorld } from "../../world";
import { request } from "undici";
import { config } from "../../infrastructure/config";
import {
  headerRequest,
  urlCreateSolution,
} from "../../constants/default-params";

export const createSolution = async (
  world: CustomWorld,
  solutionName: string
) => {
  await request(urlCreateSolution(), {
    method: "POST",
    body: JSON.stringify({
      id: null,
      name: solutionName,
      "solution-id": config().solutionID,
    }),
    headers: headerRequest(world.accessToken, config().accountID),
  });
};
