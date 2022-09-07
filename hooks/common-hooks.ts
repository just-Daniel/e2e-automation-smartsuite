import {
  After,
  Before,
  BeforeAll,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { PlaywrightFluent } from "playwright-fluent";
import { accessTokenObject, CustomWorld } from "../world";
import { getAccessToken } from "./get-access-token";

setDefaultTimeout(120000);

BeforeAll(async function () {
  accessTokenObject.accessToken = await getAccessToken();
});

Before(async function (this: CustomWorld) {
  this.p = new PlaywrightFluent()
    .withBrowser("chromium")
    .withCursor()
    .withOptions({ headless: process.platform === "darwin" ? false : true })
    .withDefaultWaitOptions({ stabilityInMilliseconds: 100 });

  process.platform === "darwin" &&
    this.p.withOptions({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
});

After(async function (this: CustomWorld) {
  await this.p.close();
});
