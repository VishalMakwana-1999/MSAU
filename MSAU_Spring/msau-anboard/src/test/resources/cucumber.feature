Feature: Test All APIs created
  Scenario: Fetch all Onboardees
    When I send a get request
    Then I receive a valid response

  Scenario: Fetch List of Managers
    When I try to fetch Managers
    Then I receive a list of Managers

    Scenario: Fetch Skill Trends
      When I try to get skill trends
      Then I receive skill trends

  Scenario: Fetch Location Trends
    When I try to get location trends
    Then I receive location trends

  Scenario: Fetch Manager Trends
    When I try to get manager trends
    Then I receive manager trends

  Scenario: Fetch Year Trends
    When I try to get year trends
    Then I receive year trends

    Scenario: Fetch Onboardee By ID
      When I try to fetch Onboardee By Id 2
      Then I get an onboardee with given id
