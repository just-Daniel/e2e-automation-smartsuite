import { StoryWithProps } from "playwright-fluent";
import {
  CONFIRM_DELETE,
  DELETE_AUTOMATION,
  DOTS_MENU,
  NAME_OPTION,
  PARENT_ELEMENT,
} from "../../constants/default-params";

export const deleteAutomationViaUI: StoryWithProps<string> = async (
  p,
  automationName
) => {
  const parentElement = p
    .selector(PARENT_ELEMENT)
    .find(NAME_OPTION(automationName))
    .parent()
    .parent();
  const dots_menu = parentElement.find(DOTS_MENU);

  await p.currentPage()?.waitForSelector(NAME_OPTION(automationName), {state: 'visible'});
  await p
    .hover(parentElement)
    .click(dots_menu)
    .click(DELETE_AUTOMATION)
    .click(CONFIRM_DELETE);
  await p.expectThatSelector(CONFIRM_DELETE).isNotVisible();
  await p.currentPage()?.waitForNavigation();
};
