import {
  CreateAutomationRequest,
  InputConfig,
} from "@smartsuite/automation-engine-api";
import { config } from "../../../infrastructure/config";

export const buildAutomation = (
  triggerInputs: InputConfig[],
  actionInputs: InputConfig[],
  testAutomationName: string
): CreateAutomationRequest => ({
  automation: {
    automationId: "",
    solutionId: config().solutionID,
    label: testAutomationName,
    userStatus: 0,
    description: "",
    trigger: {
      credentialId: "",
      inputs: triggerInputs,
      triggerReference: {
        integrationId: config().integration,
        triggerId: "created-record",
      },
      conditions: { operator: 0, group: [] },
    },
    automaticDescription: "",
    // '{"key":"phrase-builder.when-trigger-actions","data":{"trigger":{"key":"phrase-builder.when-a-record-is-created-in","data":{"applicationLabel":"App 1","conditionsText":[]}},"actions":[{"key":"phrase-builder.action-create-record","data":{"applicationLabel":"App 2","fieldsSet":["",{"key":"phrase-builder.action-and-set","data":{"fieldName":"Assigned To","fieldValue":["Kostya Kulyk"]}}]}}]}}',
    actions: [
      {
        dependencies: [],
        credentialId: "",
        inputs: actionInputs,
        actionReference: {
          integrationId: config().integration,
          actionId: "create-record",
          instanceId: 0,
        },
      },
    ],
  },
});
