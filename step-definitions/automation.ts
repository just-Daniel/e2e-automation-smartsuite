import type { DataTable } from "@cucumber/cucumber";
import { defineStep } from "@cucumber/cucumber";

import {
  saveAutomationByDefault,
  createAction,
  createAutomation,
  createFields,
  createTrigger,
  checkPhraseBuilder,
  checkCreatedAutomation,
} from "../stories";

import { deleteAutomationViaUI } from "../stories/actions/delete.stories";
import { openAutomationUi } from "../stories/actions/navigate";
import { updateAction } from "../stories/actions/update.actions";
import {
  editAutomation,
  updateAutomationViaUI,
} from "../stories/actions/update.stories";
import { CustomWorld } from "../world";

defineStep("I open automation ui", async function (this: CustomWorld) {
  await this.p.runStory(openAutomationUi, this);
});

defineStep(
  "I create Automation:",
  async function (this: CustomWorld, data: DataTable) {
    await this.p.runStory(createAutomation, data);
  }
);

defineStep(
  "I create Trigger:",
  async function (this: CustomWorld, data: DataTable) {
    await this.p.runStory(createTrigger, data);
  }
);

defineStep(
  "I create Action:",
  async function (this: CustomWorld, data: DataTable) {
    await this.p.runStory(createAction, data);
  }
);

defineStep(
  "I add fields:",
  async function (this: CustomWorld, data: DataTable) {
    await this.p.runStory(createFields, data);
  }
);

defineStep("I save automation", async function (this: CustomWorld) {
  await this.p.runStory(saveAutomationByDefault);
});

defineStep(
  "I verify Automation exists:",
  async function (this: CustomWorld, data: DataTable) {
    await this.p.runStory(checkPhraseBuilder, data);
  }
);
defineStep(
  "I edit {string} automation",
  async function (this: CustomWorld, automationName: string) {
    await this.p.runStory(editAutomation, automationName);
  }
);

defineStep(
  "I update automation:",
  async function (this: CustomWorld, data: DataTable) {
    await this.p.runStory(updateAutomationViaUI, data);
  }
);

defineStep(
  "I update action fields:",
  async function (this: CustomWorld, data: DataTable) {
    await this.p.runStory(updateAction, data);
  }
);

defineStep(
  "I delete automation {string} on ui",
  async function (this: CustomWorld, automationName: string) {
    await this.p.runStory(deleteAutomationViaUI, automationName);
  }
);

defineStep(
  "I verify that automation {string} is in automation list",
  async function (this: CustomWorld, automationName: string) {
    await this.p.runStory(checkCreatedAutomation, automationName);
  }
);
