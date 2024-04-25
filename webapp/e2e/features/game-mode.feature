Feature: Playing game modes

Scenario: Starts a new classic game
  Given A logged user in home view
  When I press classic play
  Then The game ends after 10 questions
Scenario: Starts a new suddendeath game
  Given A logged user in home view
  When I press suddendeath game
  Then The game ends when time runs out
Scenario: Starts a new againstClock game
  Given A logged user in home view
  When I press againstClock game
  Then The game doesn´t finish after 10 questions