# Readme.md

## App Platform:
The app is designed for the Web.

## Tech stack:
The app uses the following technologies:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite3
- **Deployment**: 

## App Intro:
The app is a **Decision Maker** tool that allows users to make decisions by randomly selecting an option from a list. Users can add, delete, and view decisions with associated options, helping them easily decide on various things (like restaurants, activities, etc.).

## Tool Intro:
The app uses the following tools for development:
- **Node.js** (https://nodejs.org/en/): JavaScript runtime for building scalable network applications.
- **Express** (https://expressjs.com/): Web framework for Node.js used to create API endpoints and manage routes.
- **SQLite3** (https://www.sqlite.org/index.html): Lightweight SQL database used to store user decisions and options.
- **Visual Studio Code** (https://code.visualstudio.com/): IDE used for coding and debugging.
- **GitHub** (https://github.com/): Version control for managing codebase and collaboration.

## Detailed Functionality:
The application allows users to:
1. **Create a Decision**: Users can input a decision (e.g., “Where to eat?”) and add a default option (initially the same as the decision name).
2. **Add Options**: Users can add multiple options for each decision (e.g., “Restaurant A,” “Restaurant B”).
3. **Delete Options**: Users can delete options if there are more than one for a decision.
4. **Delete a Decision**: A decision and all its associated options can be deleted.
5. **Randomly Select an Option**: Once a decision is made, the app randomly selects one of the options to help the user make a choice.

## Development Process:
- Initially, the backend was set up using **Node.js** with **Express** to handle API routes for decisions and options.
- A lightweight **SQLite3** database was implemented to store and manage data for decisions and options.
- The functionality for adding, updating, deleting, and randomly selecting options was tested to ensure smooth user experience.
- The app is hosted locally and can be deployed to any server or cloud platform supporting Node.js.
