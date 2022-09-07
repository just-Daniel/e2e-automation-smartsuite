Feature: Phrase Builder
    Background: 
        Given I delete all automation via api
        And I open automation ui

    Scenario: Short phrasebuilder dosent't has button 
        Given I create Automation:
            | Name                   | Status |
            | e2e-Prasebuilder-Short | off    |
        And I create Trigger:
            | Name                     | Application   |
            | When a record is created | App 1         |
        And I create Action:
            | Name            | Application   |
            | Create a record | App 1         |
        And I add fields:
            | Name        | Value                   |
            | Assigned To | Menu->Current User      |
        And I save automation
        And I verify Automation exists:
            | Name                   | Status | Description                                                                                      |
            | e2e-Prasebuilder-Short | on     | When a Record is created in App 1 → Create a Record in App 1 and set Assigned To to Kostya Kulyk |
        Then I verify Phrase builder button doesn't exist
            | AutomationTitle        | ButtonName |
            | e2e-Prasebuilder-Short | more       |

    Scenario: Add short text to the description and check button "more" doesn't exist
        Given I create Automation:
            | Name                                 | Status |
            | e2e-Edited-Description-To-Short-Text | on    |
        And I create Trigger:
            | Name                     | Application   |
            | When a record is created | App 1         |
        And I create Action:
            | Name            | Application   |
            | Create a record | App 1         |
        And I add fields:
            | Name        | Value              |
            | Assigned To | Menu->Current User |
        When I save automation
        And I verify Automation exists:
            | Name                                 | Status | Description                                                                                      |
            | e2e-Edited-Description-To-Short-Text | on     | When a Record is created in App 1 → Create a Record in App 1 and set Assigned To to Kostya Kulyk |
        Then I edit automation description:
            | AutomationTitle                      | NewDescriptionText              |
            | e2e-Edited-Description-To-Short-Text | It description the best!!!      |
        Then I verify Phrase builder button doesn't exist
            | AutomationTitle                      | ButtonName |
            | e2e-Edited-Description-To-Short-Text | more       |


# TODO: Buttons don't visible. Uncommit when developers will be fixed:

    # Scenario: Add long text to the description and check exist buttons
    #     Given I create Automation:
    #         | Name                                | Status |
    #         | e2e-Edited-Description-To-Long-Text | on    |
    #     And I create Trigger:
    #         | Name                     | Application   |
    #         | When a record is created | App 1         |
    #     And I create Action:
    #         | Name            | Application   |
    #         | Create a record | App 1         |
    #     And I add fields:
    #         | Name        | Value              |
    #         | Assigned To | Menu->Current User |
    #     When I save automation
    #     And I verify Automation exists:
    #         | Name                                | Status | Description                                                                                      |
    #         | e2e-Edited-Description-To-Long-Text | on     | When a Record is created in App 1 → Create a Record in App 1 and set Assigned To to Kostya Kulyk |
    #     Then I edit automation description:
    #         | AutomationTitle                     | NewDescriptionText                                                                                                                                                                                                                                                                                                   |
    #         | e2e-Edited-Description-To-Long-Text | For those of you who aren't aware, cancel culture refers to the mass withdrawal of support from public figures or celebrities who have done things that aren't socially accepted today. This practice of "canceling" or mass shaming often occurs on social media platforms such as Twitter, Instagram, or Facebook. |
    #     Then I verify 'e2e-Edited-Description-To-Long-Text' button 'more' exists but 'less' doesn't exist
    #     And I verify when clicked button 'more' in phrase builder:
    #         | AutomationTitle                     | ButtonExists | ButtonNotExists |
    #         | e2e-Edited-Description-To-Long-Text | less         | more            |

    #   Scenario: Long phrasebuilder has more and less buttons
    #     Given I create Automation:
    #         | Name                   | Status |
    #         | e2e-Prasebuilder-Long  | off    |
    #     And I create Trigger:
    #         | Name                     | Application   |
    #         | When a record is created | App 1         |
    #     And I create Action:
    #         | Name            | Application   |
    #         | Create a record | App 1         |
    #     And I add fields:
    #         | Name        | Value                                                    |
    #         | Title       | Menu->First Created By                                        |
    #         | Description | Menu->Open Comments  |         
    #         | Assigned To | Menu->Current User        |
    #         | Priority    | Menu->High                |
    #         | Status      | Menu->Complete          |
    #         | Due Date    | Menu->Today           |
    #     When I save automation
    #     And I verify Automation exists:
    #         | Name                  | Status | Description                                                                                                                                                                                                                 |
    #         | e2e-Prasebuilder-Long | on     | When a Record is created in App 1 → Create a Record in App 1 and set Title to First Created By, set Description to , set Assigned To to Current User, set Priority to Normal, set Status to Complete, set Due Date to Today |
    #     Then I verify 'e2e-Prasebuilder-Long' button 'more' exists but 'less' doesn't exist
    #     And I verify when clicked button 'more' in phrase builder:
    #         | AutomationTitle       | ButtonExists | ButtonNotExists |
    #         | e2e-Prasebuilder-Long | less         | more            |
    #     And I verify when clicked button 'less' in phrase builder:
    #         | AutomationTitle       | ButtonExists | ButtonNotExists |
    #         | e2e-Prasebuilder-Long | more         | less            |