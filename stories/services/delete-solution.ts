import { request } from "undici";
import {
  headerRequest,
  urlDeleteSolutionService,
} from "../../constants/default-params";
import { config } from "../../infrastructure/config";
import { CustomWorld } from "../../world";
import { solutionNameToId } from "./get-solution-id-service";

export const deleteSolutionService = async (
  world: CustomWorld,
  solutionName: string
) => {
  const solutionIdCustom = await solutionNameToId(
    solutionName,
    world.accessToken ?? ""
  );
  await request(urlDeleteSolutionService(solutionIdCustom), {
    method: "POST",
    headers: headerRequest(world.accessToken, config().accountID),
  }).catch((err) => {
    console.error(err);
  });
};
