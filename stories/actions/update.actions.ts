import { DataTable } from "@cucumber/cucumber";
import { StoryWithProps } from "playwright-fluent";
import {
  FIELD_ELEMENT,
  NAME_OPTION,
  SINGLE_BUTTON,
  TEXT_FIELD,
} from "../../constants/default-params";

const updateTitle: StoryWithProps<string> = async (p, value) => {
  const row = value.split("->");
  const addButton = FIELD_ELEMENT(p, "Title").find(SINGLE_BUTTON);
  await p.click(FIELD_ELEMENT(p, "Title").find(TEXT_FIELD));
  await addButton.click();
  for (let i = 1; i < row.length - 1; i++) {
    await p.click(NAME_OPTION(row[i]));
  }
  await p.typeText(row[row.length - 1], {
    clearExistingTextBeforeTyping: false,
  });
};

const updateFields = {
  names: ["Title"],
  funcs: [updateTitle],
};

export const updateAction: StoryWithProps<DataTable> = async (p, data) => {
  const rows = data.hashes();
  for (const row of rows) {
    const functionNameIndex = updateFields.names.indexOf(row.Name);
    await updateFields.funcs[functionNameIndex](p, row.Value);
  }
};
