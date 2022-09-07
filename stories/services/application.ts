import { request } from "undici";
import {
  headerRequest,
  urlCreateApplication,
  urlGetAllApplications,
} from "../../constants/default-params";
import { config } from "../../infrastructure/config";
import { CustomWorld } from "../../world";

export const createApplication = async (
  world: CustomWorld,
  appName: string
) => {
  const applications = await getAllApplicationsRequest(
    world,
    config().solutionID
  );
  const appExist = applications.some(
    (app: { name: string }) => app.name === appName
  );

  if (!appExist) {
    createApplicationRequest(world, appName, config().solutionID);
  }
};

const createApplicationRequest = async (
  world: CustomWorld,
  appName: string,
  solutionId: string
) => {
  const response = await request(urlCreateApplication(), {
    method: "POST",
    headers: headerRequest(world.accessToken, config().accountID),
    body: JSON.stringify({
      solution: solutionId,
      name: appName,
      structure: [],
    }),
  });

  if (response.statusCode > 299) {
    throw new Error(
      `Error when create application. Error with response status ${response.statusCode}`
    );
  }
};

const getAllApplicationsRequest = async (
  world: CustomWorld,
  solutionId: string
) => {
  const response = await request(urlGetAllApplications(solutionId), {
    method: "GET",
    headers: headerRequest(world.accessToken, config().accountID),
  });

  if (response.statusCode > 299) {
    throw new Error(
      `Error when get applications. Error with response status ${response.statusCode}`
    );
  }

  return response.body.json();
};
