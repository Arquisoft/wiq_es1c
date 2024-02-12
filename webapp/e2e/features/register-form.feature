Feature: Registering a new user

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press submit
  Then A confirmation message should be shown in the screen

Scenario: The user puts two different passwords
  Given An unregistered user
  When I fill the data with different passwords in the form and press submit
  Then A error message appears

Scenario: The user uses an already taken username
  Given An unregistered user
  When I fill the data with a taken username
  Then A error message appears