Feature: Playing a game

Scenario: Starts a new game
  Given An logged user since home view
  When I press play
  Then A new game starts

Scenario: The user select one answer
  Given A logged user in a game
  When I choose an option
  Then Show results
