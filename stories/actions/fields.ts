import type { StoryWithProps } from "playwright-fluent";
import {
  MENU_BUTTON,
  NAME_OPTION,
  SINGLE_BUTTON,
  ASSIGNED_TO,
  DESCRIPTION,
  DUE_DATE,
  ELEM_IN_MENU,
  NORMAL,
  PRIORITY,
  SECOND_BUTTON,
  MEMBERS,
  FIELDS_FROM_TRIGGER,
  FIELD_VALUES,
  SYSTEM_FIELDS,
  SPECIFIC_DATE,
  DATE_ACTIONS,
  URGENT
} from "../../constants/default-params";

const createAssignment: StoryWithProps<string> = async (p, value) => {
  const row = value.split("->");
  const addButton = p.selector(MENU_BUTTON).nth(-1);

  await p.click(ASSIGNED_TO).click(addButton);
  if (await p.selector(MEMBERS).isVisible()) {
    await p.click(FIELDS_FROM_TRIGGER)
  }
  for (let i = 1; i < row.length; i++) {
    await p.click(NAME_OPTION(row[i]));
  }
};
const createStatus: StoryWithProps<string> = async (p, value) => {
  const row = value.split("->");
  const addButton = p.selector(MENU_BUTTON).nth(-1);

  await p.click("text=Status").click(addButton);
  if (await p.selector(FIELDS_FROM_TRIGGER).isVisible()) {
    await p.click(FIELD_VALUES)
  }
  for (let i = 1; i < row.length; i++) {
    await p.click(NAME_OPTION(row[i]));
  }
};

const createTitle: StoryWithProps<string> = async (p, value) => {
  const row = value.split("->");
  const addButton = p.selector(SINGLE_BUTTON).nth(-1);
  
  await p.click("text=Title").click(addButton);
  if (await p.selector(SYSTEM_FIELDS).isVisible()) {
    await p.click(FIELDS_FROM_TRIGGER)
  }
  for (let i = 1; i < row.length; i++) {
    if (row[i] === 'Title') {
      await p.click(`div[data-testid=menu-option-in] :text("Title")`);
    } else {
      await p.click(NAME_OPTION(row[i]));
    }
  }
};

const createDescription: StoryWithProps<string> = async (p, value) => {
  const row = value.split("->");
  const addButton = p.selector(SINGLE_BUTTON).nth(-1);

  await p.click(DESCRIPTION).click(addButton);
  if (await p.selector(SYSTEM_FIELDS).isVisible()) {
    await p.click(FIELDS_FROM_TRIGGER)
  }
  for (let i = 1; i < row.length; i++) {
    await p.click(NAME_OPTION(row[i]));
  }
};

const createPriority: StoryWithProps<string> = async (p, value) => {
  const row = value.split("->");
  const addButton = p.selector(MENU_BUTTON).nth(-1);
  await p.click(PRIORITY).click(addButton);
  if (await p.selector(URGENT).isNotVisible()) {
    await p.click(FIELD_VALUES)
  }
  for (let i = 1; i < row.length - 1; i++) {
    await p.click(NAME_OPTION(row[i]));
  }
  await p.selector(ELEM_IN_MENU).withText(NORMAL).click();
};

const createDueDate: StoryWithProps<string> = async (p, value) => {
  const row = value.split("->");
  const addButton = p.selector(SECOND_BUTTON).nth(-1);
  await p.click(DUE_DATE).click(addButton);
  if (await p.selector(SPECIFIC_DATE).isVisible()) {
    await p.click(DATE_ACTIONS)
  }
  for (let i = 1; i < row.length; i++) {
    await p.click(NAME_OPTION(row[i]));
  }
};

export const fieldFunctions = {
  names: [
    "Assigned To",
    "Description",
    "Priority",
    "Status",
    "Title",
    "Due Date",
  ],
  funcs: [
    createAssignment,
    createDescription,
    createPriority,
    createStatus,
    createTitle,
    createDueDate,
  ],
};
