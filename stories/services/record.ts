import { config } from "./../../infrastructure/config";
import { DataTable } from "@cucumber/cucumber";
import { request } from "undici";
import { CustomWorld } from "../../world";
import { buildEngineClient } from "../clients/engine-client";
import {
  headerRequest,
  urlCreateRecord,
  urlDeleteRecord,
  urlGetAllRecords,
} from "../../constants/default-params";

interface Record {
  title: string;
  deleted_date: { date: string; include_time: boolean };
  id: string;
}

export const createRecord = async (
  world: CustomWorld,
  appName: string,
  dataTable: DataTable
) => {
  const row = dataTable.hashes()[0];
  const application_id = await getApplicationId(
    world,
    config().solutionID,
    appName
  );

  if (application_id === undefined) {
    throw new Error(`Error with application name "${appName}" is undefined`);
  }

  await deleteExistRecord(application_id, world, row);
  await createRecordRequest(world, application_id, row);
  await world.p.wait(row.WaitAfterCreatedInMs);
};

export const verifyExistRecord = async (
  world: CustomWorld,
  appName: string,
  dataTable: DataTable
) => {
  const row = dataTable.hashes()[0];
  const application_id = await getApplicationId(
    world,
    config().solutionID,
    appName
  );

  if (application_id === undefined) {
    throw new Error(`Error with application name "${appName}" is undefined`);
  }

  const records = await getAllRecords(application_id, world.accessToken);
  const existRecord = records.items.some(
    (record: Record) =>
      record.title === row.Title && record.deleted_date.include_time === false
  );

  if (!existRecord) {
    throw new Error(
      `Error in application "${appName}", doesn't exist record - "${existRecord.title}"`
    );
  }
};

const getApplicationId = async (
  world: CustomWorld,
  solutionId: string,
  appName: string
): Promise<string | undefined> => {
  return (
    await buildEngineClient(world).ListApplications({ solutionId })
  ).applications.find((app) => app.label === appName)?.id;
};

const createRecordRequest = async (
  world: CustomWorld,
  application_id: string,
  row: { Title: string }
) => {
  const response = await request(urlCreateRecord(application_id), {
    method: "POST",
    body: JSON.stringify({ application_id, title: row.Title }),
    headers: headerRequest(world.accessToken, config().accountID),
  });

  if (response.statusCode > 299) {
    throw new Error(
      `Error when create record. Error with response status ${response.statusCode}`
    );
  }
};

const getAllRecords = async (
  applicationId: string,
  accessToken: string | undefined
) => {
  const response = await request(urlGetAllRecords(applicationId), {
    method: "POST",
    headers: headerRequest(accessToken, config().accountID),
  });

  return await response.body.json();
};

const checkExistRecord = async (
  application_id: string,
  world: CustomWorld,
  row: { Title: string }
): Promise<void | Record> => {
  const records = await getAllRecords(application_id, world.accessToken);
  const recordExist: Record = records.items.find(
    (record: Record) =>
      record.title === row.Title && record.deleted_date.include_time === false
  );

  return recordExist;
};

const deleteExistRecord = async (
  application_id: string,
  world: CustomWorld,
  row: { Title: string }
) => {
  const recordExist = await checkExistRecord(application_id, world, row);

  if (recordExist) {
    const response = await request(urlDeleteRecord(application_id), {
      method: "PATCH",
      body: JSON.stringify({ items: [recordExist.id] }),
      headers: headerRequest(world.accessToken, config().accountID),
    });
  }
};
