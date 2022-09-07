import { DataTable } from "@cucumber/cucumber";
import { StoryWithProps } from "playwright-fluent";
import {
  ACTION,
  ADD_DESCRIPTION,
  CHECKBOX,
  DOTS_MENU,
  EDIT_DESCRIPTION,
  FIELDS,
  KEY_ENTER,
  NAME_OPTION,
  PARENT_ELEMENT,
  RENAME,
  SAVE_DESCRIPTION,
} from "../../constants/default-params";

export const editAutomation: StoryWithProps<string> = async (
  p,
  automationName
) => {
  const parentElement = p
    .selector(PARENT_ELEMENT)
    .find(NAME_OPTION(automationName))
    .parent()
    .parent();
  await p.click(parentElement);
};

export const updateAutomationViaUI: StoryWithProps<DataTable> = async (
  p,
  data
) => {
  const row = data.hashes()[0];
  await p.runStory(updateAutomationName, row.Name);
  await p.runStory(updateDescription, row.Description);
  await p.runStory(updateStatus, row.Status);
  //WARNING: click on "Action" is needed because of "something went wrong" automation
  await p.click(ACTION);
  await p.waitUntil(() => p.selector(FIELDS).isVisible());
};

const updateAutomationName: StoryWithProps<string> = async (
  p,
  newAutomationName
) => {
  await p
    .click(DOTS_MENU)
    .click(RENAME)
    .typeText(newAutomationName)
    .pressKey(KEY_ENTER);
};

const updateDescription: StoryWithProps<string> = async (p, newDescription) => {
  await p.click(DOTS_MENU);
  if (await p.selector(ADD_DESCRIPTION).isNotVisible()) {
    await p.click(EDIT_DESCRIPTION);
  } else {
    await p.click(ADD_DESCRIPTION);
  }
  await p.typeText(newDescription).click(SAVE_DESCRIPTION);
};

const updateStatus: StoryWithProps<string> = async (p, newStatus) => {
  const checkbox = p.selector(CHECKBOX);
  if (
    (newStatus === "on" && (await checkbox.isUnchecked())) ||
    (newStatus === "off" && (await checkbox.isChecked()))
  ) {
    await checkbox.parent().click();
  }
};
