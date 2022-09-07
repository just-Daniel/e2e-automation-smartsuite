import type { DataTable } from "@cucumber/cucumber";
import type { Story, StoryWithProps } from "playwright-fluent";
import {
  ADD_ACTION_BUTTON,
  ADD_AUTOMATION_BUTTON,
  SELECT_FIELDS_BUTTON,
  ADD_TRIGGER_BUTTON,
  CREATE_FIRST_AUTOMATION,
  KEY_ENTER,
  NAME_OPTION,
  NEW_AUTOMATION_BUTTON,
  SAVE_AUTOMATION_BUTTON,
  SELECT_APP_BUTTON,
  SWITCH_BUTTON,
  SWITCH_ON_BUTTON,
  SELECT_APP_IN_TRIGGER,
} from "../../constants/default-params";
import { fieldFunctions } from "./fields";

export const createAutomation: StoryWithProps<DataTable> = async (
  p,
  dataTable
) => {
  const row = dataTable.hashes()[0];

  if (await p.selector(ADD_AUTOMATION_BUTTON).isVisible()) {
    await p.click(ADD_AUTOMATION_BUTTON);
  } else {
    await p.click(CREATE_FIRST_AUTOMATION);
  }

  await p
    .click(NEW_AUTOMATION_BUTTON)
    .typeText(row.Name, { delay: 0 })
    .pressKey(KEY_ENTER);
  if (row.Status === "on") {
    await p.click(SWITCH_BUTTON);
  }
};

export const createTrigger: StoryWithProps<DataTable> = async (
  p,
  dataTable
) => {
  const row = dataTable.hashes()[0];
  await p.click(ADD_TRIGGER_BUTTON).click(NAME_OPTION(row.Name));
  await p.click(SELECT_APP_IN_TRIGGER).click(NAME_OPTION(row.Application));
};

export const createAction: StoryWithProps<DataTable> = async (p, dataTable) => {
  const row = dataTable.hashes()[0];
  await p
    .click(ADD_ACTION_BUTTON)
    .click(NAME_OPTION(row.Name))
    .click(SELECT_APP_BUTTON)
    .click(NAME_OPTION(row.Application));
};

export const createFields: StoryWithProps<DataTable> = async (p, dataTable) => {
  const rows = dataTable.hashes();
  for (const row of rows) {
    await p.click(SELECT_FIELDS_BUTTON);
    const functionNameIndex = fieldFunctions.names.indexOf(row.Name);
    await fieldFunctions.funcs[functionNameIndex](p, row.Value);
  }
};

export const saveAutomationByDefault: Story = async (p) => {
  const acceptButton = p.selector(SWITCH_ON_BUTTON);
  const addButton = p.selector(ADD_AUTOMATION_BUTTON);
  const saveButton = p.selector(SAVE_AUTOMATION_BUTTON);
  if (await addButton.isVisible()) {
    await addButton.click();
  } else {
    await saveButton.click();
  }
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
};
