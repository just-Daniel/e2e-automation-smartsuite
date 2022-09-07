Feature: verify the efficiency of creating records via automation record
    Background: prepare automation list
        Given I delete all automation via api

    Scenario: Create apps with bind record in automation
        Given I create application with name "App 1"
        And I create application with name "App 2"
        And I open automation ui
        When I create Automation:
            | Name                | Status |
            | e2e-test-automation | off    |
        And I create Trigger:
            | Name                     | Application |
            | When a record is created | App 1       |
        And I create Action:
            | Name            | Application |
            | Create a record | App 2       |
        And I add fields:
            | Name  | Value       | 
            | Title | Menu->Title | 
        And I save automation
        And I create a record on "App 1":
            | Title      | WaitAfterCreatedInMs |
            | TEST_TITLE | 5000                 |
        Then I verify that on "App 2" was created record with fields:
            | Title      |
            | TEST_TITLE |