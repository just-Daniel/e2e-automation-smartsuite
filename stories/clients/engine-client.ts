import { config } from "./../../infrastructure/config";
import { AutomationsClientProtobuf } from "@smartsuite/automation-engine-api";
import type { Rpc } from "twirp-ts";
import { TwirpError } from "twirp-ts";
import fetch from "node-fetch";
import { CustomWorld } from "../../world";

type FetchHttpRPCOptions = Omit<RequestInit, "body" | "method"> & {
  baseUrl: string;
};

export const buildEngineClient = (
  world: CustomWorld
): AutomationsClientProtobuf => {
  const headers: FetchHttpRPCOptions["headers"] = {
    "account-id": config().accountID,
    "access-token": world.accessToken ?? "",
  };

  return new AutomationsClientProtobuf(
    FetchHttpRPC({
      baseUrl: config().engineURL,
      headers,
    })
  );
};

const FetchHttpRPC = (options: FetchHttpRPCOptions): Rpc => ({
  async request(
    service,
    method,
    contentType,
    data
  ): Promise<object | Uint8Array> {
    const response = await fetch(`${options.baseUrl}/${service}/${method}`, {
      method: "POST",
      // @ts-expect-error warning
      headers: { "content-type": contentType, ...(options.headers ?? {}) },
      body: data instanceof Uint8Array ? data : JSON.stringify(data),
    });

    if (response.status === 200) {
      if (contentType === "application/json") {
        return await response.json();
      }
      return new Uint8Array(await response.arrayBuffer());
    }

    throw TwirpError.fromObject(await response.json());
  },
});
