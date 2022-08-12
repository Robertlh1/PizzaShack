# PizzaShack

Welcome to Bob's Pizza Shack! To run this website locally, you'll need to have postgresql installed on your computer.

If you go to their website, it should help you on your way - https://www.postgresql.org/download/ - After you have postgres, go to ./db/connection example.js and follow the instructions there to enable database access.

Now on Linux or WSL, run the command npm install in your terminal to download all the required packages and follow the commands below to launch the site.

Terminal Commands:
npm run react-dev - Compiles the site into a usable form, must run this command first.
npm run postgres-start - Initializes the database from a schema, and also loads an example Pepperoni pizza in.
npm run express-dev - Starts a local server running the site, you can access it at http://localhost:8000
npm run test - Runs a test battery made using React Testing Library, Jest and Mock Server Worker