import { getAccessTokenForUser } from "../make-client-with-password";
import { config } from "../infrastructure/config";

export const getAccessToken = async () => {
  return await getAccessTokenForUser(
    config().backendURL,
    config().accountID,
    config().email,
    config().password,
    config().authURL,
    config().clientID,
    config().realm,
    config().audience
  );
};
