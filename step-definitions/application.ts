import { defineStep } from "@cucumber/cucumber";
import { createApplication } from "../stories/services/application";
import { CustomWorld } from "../world";

defineStep(
  "I create application with name {string}",
  async function (this: CustomWorld, appName: string) {
    await createApplication(this, appName);
  }
);
