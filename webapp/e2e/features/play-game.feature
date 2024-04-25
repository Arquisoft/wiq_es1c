Feature: Playing a game

Scenario: Starts a new game
  Given A logged user in home view
  When I press classic play
  Then A new game starts
Scenario: Results are shown
  Given A logged user in a game
  When I choose an option
  Then Show results
Scenario: Shows questions continuously
  Given A logged user in a game
  When I choose an option
  Then New Question appears
Scenario: The answer is persistent in history
  Given A logged user in a game
  When I choose an option
  Then Answer is saved in history
Scenario: Finish game
  Given A logged user in a game
  When I click in home and confirm
  Then The game is finished