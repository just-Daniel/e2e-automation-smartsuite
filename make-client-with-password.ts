import { URL } from "url";
import { Cookie, CookieJar } from "tough-cookie";
import { request } from "undici";

const filterIdentity = <T>(input?: T | undefined): T => input as T;

export const getAccessTokenForUser = async (
  smartSuiteBackendUrl: string,
  _accountId: string,
  username: string,
  password: string,
  authUrl: string = "https://auth.smartsuite.com",
  clientId: string = "bA05VHhDBO6hItQG348essqh8Eu7ZI33",
  realm: string = "production",
  audience: string = "https://auth.smartsuite.com/api/"
): Promise<string> => {
  const [loginTicket, jar] = await getLoginTicket(
    username,
    password,
    smartSuiteBackendUrl,
    authUrl,
    clientId,
    realm
  );
  const code = await getCode(
    loginTicket,
    jar,
    smartSuiteBackendUrl,
    authUrl,
    clientId,
    audience,
    realm
  );
  return await getAuthToken(code, smartSuiteBackendUrl);
};

const backendUrlWithPath = (
  smartSuiteBackendUrl: string,
  path: string
): string => {
  const url = new URL(smartSuiteBackendUrl);
  url.pathname = path;
  return url.href;
};

const getLoginTicket = async (
  username: string,
  password: string,
  smartSuiteBackendUrl: string,
  authUrl: string,
  clientId: string,
  realm: string
): Promise<[string, CookieJar]> => {
  const url = `${authUrl}/co/authenticate`;
  const response = await request(url, {
    method: "POST",
    body: JSON.stringify({
      client_id: clientId,
      credential_type: "http://auth0.com/oauth/grant-type/password-realm",
      realm,
      password,
      username,
    }),
    headers: {
      "content-type": "application/json",
      origin: backendUrlWithPath(smartSuiteBackendUrl, "/"),
    },
  });
  if (response.headers["set-cookie"] === undefined) {
    throw new Error("missing set cookies");
  }
  const jar = new CookieJar();

  const setCookies = response.headers["set-cookie"];

  await Promise.all(
    setCookies.map(async (c: string | Cookie) => {
      await jar.setCookie(c, url);
    })
  );

  const ticket = await response.body.json();
  return [(ticket as { login_ticket: string }).login_ticket, jar];
};

const getCode = async (
  loginTicket: string,
  jar: CookieJar,
  smartSuiteBackendUrl: string,
  authUrl: string,
  clientId: string,
  audience: string,
  realm: string
): Promise<string> => {
  const codeUrl = new URL(`${authUrl}/authorize`);
  codeUrl.searchParams.append("client_id", clientId);
  codeUrl.searchParams.append("audience", audience);
  codeUrl.searchParams.append("scope", "offline_access");
  codeUrl.searchParams.append(
    "redirect_uri",
    backendUrlWithPath(smartSuiteBackendUrl, "/authenticate/login/complete")
  );
  codeUrl.searchParams.append("response_type", "code");
  codeUrl.searchParams.append("realm", realm);
  codeUrl.searchParams.append(
    "state",
    JSON.stringify({ next: "login/account" })
  );
  codeUrl.searchParams.append("login_ticket", loginTicket);

  const response = await request(codeUrl, {
    method: "GET",
    headers: {
      cookie: await jar.getCookieString(codeUrl.href),
    },
  });
  await response.body.text();
  if (response.headers.location === undefined) {
    throw new Error("missing location header");
  }
  const location = new URL(response.headers.location);
  const code = location.searchParams.get("code");
  if (code === null) {
    throw new Error("missing code in location query");
  }
  return code;
};

const getAuthToken = async (
  code: string,
  smartSuiteBackendUrl: string
): Promise<string> => {
  const response = await request(`${smartSuiteBackendUrl}auth/login/`, {
    method: "POST",
    body: JSON.stringify({
      code,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  await response.body.text();
  if (response.headers["set-cookie"] === undefined) {
    throw new Error("missing set-cookie");
  }
  const cookies = response.headers["set-cookie"]
    .map((c) => Cookie.parse(c))
    .filter(filterIdentity)
    .filter((c) => c?.key === "accessToken");
  if (cookies.length === 0) {
    throw new Error("accessToken cookie is missing");
  }
  return cookies?.[0]?.value ?? "";
};
