import { setWorldConstructor } from "@cucumber/cucumber";
import { PlaywrightFluent } from "playwright-fluent";
import type { Stream } from "stream";

export type MediaType = "text/plain" | "image/png" | "application/json";
export type AttachBuffer = (
  data: Buffer,
  mediaType: MediaType
) => void | Promise<void>;
export type AttachStream = (
  data: Stream,
  mediaType: MediaType
) => void | Promise<void>;
export type AttachText = (data: string) => void | Promise<void>;
export type AttachStringifiedJson = (
  data: string,
  mediaType: "application/json"
) => void | Promise<void>;
export type AttachBase64EncodedPng = (
  data: string,
  mediaType: "image/png"
) => void | Promise<void>;

export type AttachFn = AttachBuffer &
  AttachStream &
  AttachBase64EncodedPng &
  AttachStringifiedJson &
  AttachText;

export interface CucumberWorldConstructorParams {
  attach: AttachFn;
  parameters: { [key: string]: string };
}
interface AccessTokenObject {
  accessToken: string;
}
export const accessTokenObject: AccessTokenObject = {
  accessToken: "",
};

export class CustomWorld {
  public attach: AttachFn;
  public p: PlaywrightFluent = new PlaywrightFluent();
  public foo = false;
  public debug = false;
  public live = false;
  public accessToken: string | undefined;

  constructor({ attach }: CucumberWorldConstructorParams) {
    this.attach = attach;
    this.accessToken = accessTokenObject.accessToken;
  }
}

setWorldConstructor(CustomWorld);
