import { DataTable, defineStep } from "@cucumber/cucumber";
import {
  createAutomationViaApi,
  createAutomationWithParams,
  createSolution,
  deleteAutomationsViaApi,
  deleteAutomationViaApi,
  deleteSolution,
} from "../stories/api-stories/apiActions.stories";
import { CustomWorld } from "../world";

defineStep(
  "I create automation {string} via api",
  async function (this: CustomWorld, automationName: string) {
    await createAutomationViaApi(this, automationName);
  }
);

defineStep(
  "I create automation via api:",
  async function (this: CustomWorld, data: DataTable) {
    await createAutomationWithParams(data, this);
  }
);

defineStep(
  "I create {string} solution",
  async function (this: CustomWorld, appName: string) {
    await createSolution(this, appName);
  }
);

defineStep(
  "I delete automation {string} via api",
  async function (this: CustomWorld, automationName: string) {
    await deleteAutomationViaApi(this, automationName);
  }
);

defineStep(
  "I delete all automation via api",
  async function (this: CustomWorld) {
    await deleteAutomationsViaApi(this);
  }
);

defineStep(
  "I delete solution {string}",
  async function (this: CustomWorld, solutionName: string) {
    await deleteSolution(this, solutionName);
  }
);
