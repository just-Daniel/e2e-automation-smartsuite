Feature: Check automations

    Background: prepare automation list
        Given I delete all automation via api

    Scenario: delete automation
        Given I create automation "e2e-test-automation" via api
        When I open automation ui
        And I delete automation "e2e-test-automation" on ui

    Scenario: create automation
        Given I open automation ui
        When I create Automation:
            | Name                | Status |
            | e2e-test-automation | off    |
        And I create Trigger:
            | Name                     | Application |
            | When a record is created | App 1       |
        And I create Action:
            | Name            | Application |
            | Create a record | App 1       |
        And I add fields:
            | Name        | Value               |
            | Description | Menu->Open Comments |         
            | Assigned To | Menu->Current User  |
        And I save automation
        Then I verify that automation "e2e-test-automation" is in automation list

    Scenario: update automation
        Given I create automation "e2e-test-edit-automation" via api
        When I open automation ui
        And I edit "e2e-test-edit-automation" automation
        And I update automation:
            | Name                        | Description      | Status |
            | e2e-test-updated-automation | test-description | on     |
        And I update action fields:
            | Name  | Value                      |
            | Title | Menu->Assigned To->UPDATED |
        And I save automation
        Then I verify that automation "e2e-test-updated-automation" is in automation list
