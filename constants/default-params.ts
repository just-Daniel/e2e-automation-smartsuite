import { PlaywrightFluent, SelectorFluent } from "playwright-fluent";
import { URL } from "url";

export const NAME_OPTION = (name: string): string => `text=${name}`;
export const FIELD_ELEMENT = (
  p: PlaywrightFluent,
  name: string
): SelectorFluent =>
  p.selector(`text=${name}`).parent().parent().parent().parent().parent();

export const ADD_AUTOMATION_BUTTON = NAME_OPTION("Add Automation");
export const CREATE_FIRST_AUTOMATION = NAME_OPTION(
  "Create my first Automation"
);
export const NEW_AUTOMATION_BUTTON = NAME_OPTION("New Automation");
export const SAVE_AUTOMATION_BUTTON = NAME_OPTION("Save Automation");
export const ADD_TRIGGER_BUTTON = NAME_OPTION("Add Trigger");
export const ADD_ACTION_BUTTON = NAME_OPTION("Add Action");
export const SELECT_FIELDS_BUTTON = NAME_OPTION("Select field");
export const SWITCH_BUTTON = 'button[role="switch"]';
export const KEY_ENTER = "Enter";
export const SELECT_APP_BUTTON = NAME_OPTION("Select App");
export const MENU_BUTTON = "button.input-picker-group__plus-button";
export const SINGLE_BUTTON = "button.pill-picker-editor__plus-button";
export const AUTOMATION_IS_OFF = NAME_OPTION("This automation is switched off");
export const SWITCH_ON_BUTTON = NAME_OPTION("Yes, switch it on");
export const SWITCH_OFF_BUTTON = NAME_OPTION("No, keep it off");
export const HOMEPAGE = "http://localhost:3000/";
export const DOTS_MENU = "div >> data-testid=dots-menu";
export const CHECKBOX = 'input[type="checkbox"]';
export const DELETE_AUTOMATION = NAME_OPTION("Delete Automation");
export const PARENT_ELEMENT = "div.ScrollbarsCustom-Content";
export const CONFIRM_DELETE = NAME_OPTION("Yes, Delete Automation");
export const ACCESS_TOKEN_FIELD = "input[name=access-token]";
export const SAVE = NAME_OPTION("Save");
export const SETTINGS = NAME_OPTION("Settings");
export const ACTION = NAME_OPTION("Action");
export const FIELDS = NAME_OPTION("Fields");
export const RENAME = NAME_OPTION("Rename");
export const ADD_DESCRIPTION = NAME_OPTION("Add Description");
export const EDIT_DESCRIPTION = NAME_OPTION("Edit Description");
export const SAVE_DESCRIPTION = NAME_OPTION("Save Description");
export const TEXT_FIELD = "div.ProseMirror";
export const ADD_FIELDS_BUTTON = "data-testid=add-button";
export const DESCRIPTION = "text=Description";
export const ASSIGNED_TO = "text=Assigned To";
export const INPUT_TOKEN = "input[name=access-token]";
export const PRIORITY = "text=Priority";
export const ELEM_IN_MENU = ".menu-option__text";
export const NORMAL = "Normal";
export const SECOND_BUTTON = "button.input-picker-group__plus-button";
export const DUE_DATE = "text=Due Date";
export const INPUT_ACCOUNT_ID = "input[name=account-id]";
export const INPUT_SOLUTION_ID = "input[name=solution-id]";
export const INPUT_ENGINE_URL = "input[name=engine-url]";
export const INPUT_BACKEND_URL = "input[name=smartsuite-backend-url]";
export const INPUT_LANGUAGE_SETTING = "input[name=lang]";
export const FIELDS_FROM_TRIGGER = NAME_OPTION("Fields from Trigger");
export const MEMBERS = NAME_OPTION("Members");
export const FIELD_VALUES = NAME_OPTION("Field values");
export const SYSTEM_FIELDS = NAME_OPTION("System Fields");
export const SPECIFIC_DATE = NAME_OPTION("Specific Date");
export const DATE_ACTIONS = NAME_OPTION("Date Actions");
export const URGENT = NAME_OPTION("Urgent");
export const SELECT_APP_IN_TRIGGER = 'div[data-testid=Dropdown]';



export const urlCreateRecord = (appId: string): URL =>
  new URL(
    `https://staging.smartsuite.com/api/v1/applications/${appId}/records/?partial=true`
  );
export const urlDeleteRecord = (appId: string): URL =>
  new URL(
    `https://staging.smartsuite.com/api/v1/applications/${appId}/records/bulk_delete/`
  );
export const urlGetAllRecords = (appId: string): URL =>
  new URL(
    `https://staging.smartsuite.com/api/v1/applications/${appId}/records/list/?offset=0&limit=0`
  );
export const urlCreateApplication = (): URL =>
  new URL(`https://staging.smartsuite.com/api/v1/applications/`);
export const urlGetAllApplications = (solutionId: string): URL =>
  new URL(
    `https://staging.smartsuite.com/api/v1/applications/?solution=${solutionId}`
  );
export const urlDeleteSolutionService = (solutionId: string): URL =>
  new URL(
    `https://staging.smartsuite.com/api/v1/solutions/${solutionId}/mark_as_deleted/`
  );
export const urlCreateSolution = (): URL =>
  new URL(`https://staging.smartsuite.com/api/v1/solutions/`);

export const headerRequest = (
  accessToken: string | undefined,
  accountId: string
) => ({
  "content-type": "application/json",
  Authorization: `Bearer ${accessToken}`,
  "account-id": accountId,
});
