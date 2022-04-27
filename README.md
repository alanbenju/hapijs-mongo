# hapijs-mongo
Base project using hapi js as Node framework with MongoDB.

# Functionalities
Create pairs of currencies like USD ARS and update the rates using FX api, a markup fee is applied to them that can be customized for every update or used 2% as default.

# Development
Run server: `npm run start`
Run for dev: `npm run dev`
Run tests: `npm run test`

# TODOs
- Add logging package
- Test border cases
- Authentication & Authorization
- Validate schemas before adding/updating to database
- Add response interface to retrieve on every request:{success, msg, err, result}
- run tests, eslint before pushing to repository
