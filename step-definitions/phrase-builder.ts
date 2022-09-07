import { DataTable, Then } from "@cucumber/cucumber";
import { defineStep } from "@cucumber/cucumber";
import type { CustomWorld } from "../world";
import {
  ADD_DESCRIPTION,
  DOTS_MENU,
  KEY_ENTER,
  NAME_OPTION,
} from "../constants/default-params";

defineStep(
  "I verify Phrase builder button doesn't exist",
  async function (this: CustomWorld, dataTable: DataTable) {
    const row = dataTable.hashes()[0];

    const parComponent = this.p
      .selector("p")
      .withText(row.AutomationTitle)
      .parent()
      .parent();

    await this.p
      .expectThat(parComponent.find("span").withText(row.ButtonName))
      .isNotVisible();
  }
);

defineStep(
  "I verify {string} button {string} exists but {string} doesn't exist",
  async function (
    this: CustomWorld,
    title: string,
    buttonExists: string,
    buttonNotExists: string
  ) {
    const parComponent = this.p.selector("p").withText(title).parent().parent();

    await this.p
      .expectThat(parComponent.find("span").withText(buttonExists))
      .isVisible();

    await this.p
      .expectThat(parComponent.find("span").withText(buttonNotExists))
      .isNotVisible();
  }
);

defineStep(
  "I verify when clicked button {string} in phrase builder:",
  async function (this: CustomWorld, buttonMore: string, dataTable: DataTable) {
    const row = dataTable.hashes()[0];

    const parComponent = this.p
      .selector("p")
      .withText(row.AutomationTitle)
      .parent()
      .parent();

    await parComponent.find("span").withText(buttonMore).click();

    await this.p
      .expectThat(parComponent.find("span").withText(row.ButtonExists))
      .isVisible();

    await this.p
      .expectThat(parComponent.find("span").withText(row.ButtonNotExists))
      .isNotVisible();
  }
);

Then(
  "I edit automation description:",
  async function (this: CustomWorld, dataTable: DataTable) {
    const row = dataTable.hashes()[0];

    await this.p.selector(NAME_OPTION(row.AutomationTitle)).hover();
    await this.p
      .click(DOTS_MENU)
      .click(ADD_DESCRIPTION)
      .typeText(row.NewDescriptionText, { delay: 0 })
      .pressKey(KEY_ENTER);
  }
);
