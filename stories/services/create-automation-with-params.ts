import { DataTable } from "@cucumber/cucumber";
import {
  InputConfig,
  ValueDescription_T,
} from "@smartsuite/automation-engine-api";
import { config } from "../../infrastructure/config";
import { CustomWorld } from "../../world";
import { buildEngineClient } from "../clients/engine-client";
import { buildAutomation } from "./default-params/new-automation.params";

export const createAutomationWithParamsAPI = async (
  world: CustomWorld,
  data: DataTable
) => {
  const row = data.hashes()[0];
  const engineClient = buildEngineClient(world);
  const response = await engineClient.ListAutomations({
    solutionId: config().solutionID,
    pageSize: 0,
    pageToken: "",
  });

  const automation = response.automations.find(
    (automation) => automation.label === row["Title"]
  );

  if (automation === undefined) {
    const credentialResponse = await engineClient.CreateSmartSuiteCredential({
      solutionId: config().solutionID,
      authenticationMethodReference: {
        integrationId: config().integration,
        authenticationMethodId: config().method,
      },
    });
    let triggerDescription = await engineClient.DynamicTriggerDescription({
      trigger: {
        triggerReference: {
          integrationId: config().integration,

          triggerId: "created-record",
        },
        credentialId: credentialResponse.credential?.credentialId ?? "",
        inputs: [],
      },
    });
    const applicationInput = triggerDescription.trigger?.inputs[0];

    if (
      applicationInput !== undefined &&
      applicationInput.editor?.editor.oneofKind === "select"
    ) {
      const applicationId = applicationInput.editor?.editor.select.options;
      const apps: string[] = [];
      applicationId.forEach((element) => {
        apps.push(element.label);
      });
      const triggerAppId =
        applicationId[apps.indexOf(row["Trigger application"])].value;
      const actionAppId =
        applicationId[apps.indexOf(row["Action application"])].value;

      const triggerApplicationIdInput: InputConfig = {
        inputId: applicationInput?.inputId ?? "",

        valueDescription: {
          type: ValueDescription_T.STRING,
          multiple: false,
        },

        value: {
          values: [
            {
              value: {
                oneofKind: "string",
                string: triggerAppId,
              },
            },
          ],
        },
      };
      const actionApplicationIdInput: InputConfig = {
        inputId: applicationInput?.inputId ?? "",

        valueDescription: {
          type: ValueDescription_T.STRING,
          multiple: false,
        },

        value: {
          values: [
            {
              value: {
                oneofKind: "string",
                string: actionAppId,
              },
            },
          ],
        },
      };

      const automation = buildAutomation(
        [triggerApplicationIdInput],
        [
          actionApplicationIdInput,
          {
            inputId: "field-title",
            valueDescription: {
              type: 2,
              multiple: false,
            },
            value: {
              values: [
                {
                  value: {
                    oneofKind: "reference",
                    reference: {
                      outputId: "field-title",
                      source: {
                        oneofKind: "triggerReference",
                        triggerReference: {
                          integrationId: config().integration,
                          triggerId: "created-record",
                        },
                      },
                    },
                  },
                },
                {
                  value: {
                    oneofKind: "string",
                    string: " 123",
                  },
                },
              ],
            },
          },
        ],
        row["Title"]
      );

      const createAutomationResponse = await engineClient.CreateAutomation(
        automation
      );
    }
  } else if (automation !== undefined) {
    console.info("AUTOMATION WITH SUCH NAME HAS ALREADY BEEN CREATED");
  }
};
