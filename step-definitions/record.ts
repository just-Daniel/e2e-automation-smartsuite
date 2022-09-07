import { DataTable, defineStep } from "@cucumber/cucumber";
import { createRecord, verifyExistRecord } from "../stories/services/record";
import { CustomWorld } from "../world";

defineStep(
  "I create a record on {string}:",
  async function (this: CustomWorld, appName: string, dataTable: DataTable) {
    await createRecord(this, appName, dataTable);
  }
);

defineStep(
  "I verify that on {string} was created record with fields:",
  async function (this: CustomWorld, appName: string, dataTable: DataTable) {
    await verifyExistRecord(this, appName, dataTable);
  }
);
