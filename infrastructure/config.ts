import { lazy } from "@smartsuite/automation-core";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

interface Config {
  backendURL: string;
  accountID: string;
  email: string;
  password: string;
  authURL: string;
  clientID: string;
  realm: string;
  audience: string;
  solutionID: string;
  engineURL: string;
  integration: string;
  method: string;
}

export const config = lazy<Config>(() => {
  dotenvFlow.config({
    node_env: process.env.NODE_ENV ?? "development",
    silent: true,
  });
  return {
    backendURL:
      process.env.REACT_APP_SS_BACKEND_URL ??
      "https://staging.smartsuite.com/api/v1/",
    accountID: process.env.REACT_APP_ACCOUNT_ID ?? "lxovqv4h",
    email: process.env.REACT_APP_EMAIL ?? "",
    password: process.env.REACT_APP_PASSWORD ?? "",
    authURL:
      process.env.REACT_APP_AUTH_URL ?? "https://ss-staging.us.auth0.com",
    clientID:
      process.env.REACT_APP_CLIENT_ID ?? "3wr0ePLmlxggIsz8WjRyhRz01z7uHux3",
    realm: process.env.REACT_APP_REALM ?? "staging",
    audience:
      process.env.REACT_APP_AUDIENCE ??
      "https://ss-staging.us.auth0.com/api/v2/",
    solutionID: process.env.REACT_APP_SOLUTION_ID ?? "62ea1d757879407f836ad7e3",
    engineURL:
      process.env.REACT_APP_ENGINE_URL ??
      "https://ae-staging.automation.smartsuite.com",
    integration:
      process.env.REACT_APP_SMART_SUITE_INTEGRATION_ID ?? "ssi-staging",
    method: process.env.AUTH_METHOD_ID ?? "ss-auth",
  };
});

export const lazyConfigProp =
  <T extends keyof Config>(prop: T) =>
  async (): Promise<Config[T]> => {
    return config()[prop];
  };
