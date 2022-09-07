import { CustomWorld } from "../../world/custom-world";
import * as deleteAutomationEngineService from "../services/delete-automation-service";
import * as createAutomationEngineService from "../services/create-automation-service";
import * as createAutomationWithParamsService from "../services/create-automation-with-params";
import * as createRecordEngineService from "../services/create-solution";
import * as deleteSolutionEngineService from "../services/delete-solution";

import { DataTable } from "@cucumber/cucumber";

export const deleteAutomationViaApi = async (
  world: CustomWorld,
  automationName: string
) => {
  await deleteAutomationEngineService.deleteAutomationAPI(
    world,
    automationName
  );
};

export const createAutomationViaApi = async (
  world: CustomWorld,
  automationName: string
): Promise<void> => {
  await createAutomationEngineService.createAutomationAPI(
    world,
    automationName
  );
};

export const createAutomationWithParams = async (
  data: DataTable,
  world: CustomWorld
): Promise<void> => {
  await createAutomationWithParamsService.createAutomationWithParamsAPI(
    world,
    data
  );
};

export const createSolution = async (
  world: CustomWorld,
  appName: string
): Promise<void> => {
  await createRecordEngineService.createSolution(world, appName);
};

export const deleteAutomationsViaApi = async (world: CustomWorld) => {
  await deleteAutomationEngineService.deleteEveryAutomation(world);
};

export const deleteSolution = async (
  world: CustomWorld,
  solutionName: string
): Promise<void> => {
  await deleteSolutionEngineService.deleteSolutionService(world, solutionName);
};
