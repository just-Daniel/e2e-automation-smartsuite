import { config } from "../../infrastructure/config";
import { Empty } from "@smartsuite/automation-engine-api";
import { CustomWorld } from "../../world";
import { buildEngineClient } from "../clients/engine-client";

export const deleteAutomationAPI = async (
  world: CustomWorld,
  automationName: string
) => {
  const engineClient = buildEngineClient(world);
  const response = await engineClient.ListAutomations({
    solutionId: config().solutionID,
    pageSize: 0,
    pageToken: "",
  });
  const automation = response.automations.find(
    (automation) => automation.label === automationName
  );
  if (automation !== undefined) {
    await engineClient.DeleteAutomation({
      automationId: automation.automationId,
    });
  } else {
    console.info("CANT FIND AUTOMATION WITH NAME....");
  }
};

export const deleteEveryAutomation = async (world: CustomWorld) => {
  const engineClient = buildEngineClient(world);
  const response = await engineClient.ListAutomations({
    solutionId: config().solutionID,
    pageSize: 0,
    pageToken: "",
  });
  const promises: Promise<Empty>[] = [];
  for (let el of response.automations) {
    if (el.label !== undefined) {
      promises.push(
        engineClient.DeleteAutomation({
          automationId: el.automationId,
        })
      );
    } else {
      console.info("WE DIDNT DELETE ANY AUTOMATION");
    }
  }
  if (promises.length > 0) {
    await Promise.all(promises);
  }
};
