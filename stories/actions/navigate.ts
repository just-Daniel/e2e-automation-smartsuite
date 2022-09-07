import type { StoryWithProps } from "playwright-fluent";
import type { CustomWorld } from "../../world";
import {
  HOMEPAGE,
  INPUT_ACCOUNT_ID,
  INPUT_BACKEND_URL,
  INPUT_ENGINE_URL,
  INPUT_LANGUAGE_SETTING,
  INPUT_SOLUTION_ID,
  INPUT_TOKEN,
  SAVE,
  SETTINGS,
} from "../../constants/default-params";
import { config } from "../../infrastructure/config";

export const openAutomationUi: StoryWithProps<CustomWorld> = async (
  p,
  world
) => {
  await p.navigateTo(HOMEPAGE);
  await p.click(SETTINGS);
  await p.currentPage()?.fill(INPUT_ACCOUNT_ID, config().accountID);
  await p.currentPage()?.fill(INPUT_SOLUTION_ID, config().solutionID);
  await p.currentPage()?.fill(INPUT_TOKEN, world.accessToken ?? "");
  await p.currentPage()?.fill(INPUT_ENGINE_URL, config().engineURL);
  await p.currentPage()?.fill(INPUT_BACKEND_URL, config().backendURL);
  await p.currentPage()?.fill(INPUT_LANGUAGE_SETTING, "en");
  await p.click(SAVE).navigateTo(HOMEPAGE);
};
