import {
  InputConfig,
  ValueDescription_T,
} from "@smartsuite/automation-engine-api";
import { config } from "../../infrastructure/config";
import { CustomWorld } from "../../world";
import { buildEngineClient } from "../clients/engine-client";
import { buildAutomation } from "./default-params/new-automation.params";

export const createAutomationAPI = async (
  world: CustomWorld,
  automationName: string
) => {
  const engineClient = buildEngineClient(world);
  const response = await engineClient.ListAutomations({
    solutionId: config().solutionID,
    pageSize: 0,
    pageToken: "",
  });

  const automation = response.automations.find(
    (automation) => automation.label === automationName
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
      applicationInput.editor?.editor.oneofKind === "select" &&
      applicationInput.editor?.editor?.select !== undefined
    ) {
      const applicationId =
        applicationInput.editor?.editor.select.options[0].value;
      const applicationIdInput: InputConfig = {
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
                string: applicationId,
              },
            },
          ],
        },
      };
      const automation = buildAutomation(
        [applicationIdInput],
        [
          applicationIdInput,
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
        automationName
      );

      const createAutomationResponse = await engineClient.CreateAutomation(
        automation
      );
    }
  } else if (automation !== undefined) {
    console.info("AUTOMATION WITH SUCH NAME HAS ALREADY BEEN CREATED");
  }
};
