import type { DataTable } from "@cucumber/cucumber";
import type { StoryWithProps } from "playwright-fluent";
import { CHECKBOX, NAME_OPTION } from "../../constants/default-params";

export const checkPhraseBuilder: StoryWithProps<DataTable> = async (
  p,
  dataTable
) => {
  const row = dataTable.hashes()[0];
  const parComponent = p
    .selector("p")
    .withText(row.Name)
    .parent()
    .parent()
    .find("div");
  if (row.Status === "on") {
    await p.expectThat(parComponent.find(CHECKBOX)).isChecked();
  } else {
    await p.expectThat(parComponent.find(CHECKBOX)).isUnchecked();
  }
  p.expectThat(parComponent.find(NAME_OPTION(row.Description)));
};

export const checkCreatedAutomation: StoryWithProps<string> = async (
  p,
  automationName
) => {
  const findElement = p.selector(NAME_OPTION(automationName));
  await p.expectThat(findElement).isVisible();
};
