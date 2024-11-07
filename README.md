# Decision Maker

## App Platform:
The web app need to be run locally since it is not deployed yet.

## Tech stack:
The app uses the following technologies:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite3

## App Intro:
The app is a **Decision Maker** tool that allows users to make decisions by randomly selecting an option from a list. Users can add, delete, and view decisions with associated options, helping them easily decide on various things (like restaurants, activities, etc.).

## Tool Intro:
The app uses the following tools for development:
- **Node.js** (https://nodejs.org/en/): JavaScript runtime for building scalable network applications.
- **Express** (https://expressjs.com/): Web framework for Node.js used to create API endpoints and manage routes.
- **SQLite3** (https://www.sqlite.org/index.html): Lightweight SQL database used to store user decisions and options.
- **Visual Studio Code** (https://code.visualstudio.com/): IDE used for coding and debugging.
- **GitHub** (https://github.com/): Version control for managing codebase and collaboration.
- **ChatGPT** (\https://chatgpt.com/): AI tool to generate code and ideas.

## Detailed Functionality:
The application allows users to:
1. **Create a Decision**: Users can input a decision (e.g., “Where to eat?”) and add a default option (initially the same as the decision name).
2. **Add Options**: Users can add multiple options for each decision (e.g., “Restaurant A,” “Restaurant B”).
3. **Delete Options**: Users can delete options if there are more than one for a decision.
4. **Delete a Decision**: A decision and all its associated options can be deleted.
5. **Randomly Select an Option**: Once a decision is made, the app randomly selects one of the options to help the user make a choice.
6. **Edit Options**: User can edit existed options

## Development Process:
- Initially, the backend was set up using **Node.js** with **Express** to handle API routes for decisions and options.
- A lightweight **SQLite3** database was implemented to store and manage data for decisions and options.
- The functionality for adding, updating, deleting, and randomly selecting options was tested to ensure smooth user experience.
- The app is hosted locally and can be deployed to any server or cloud platform supporting Node.js.

## How to install
- Go to github (link: https://github.com/csc301-2024-f/assignment-2-ai-app-xinqiyue) and click on code button.
- Copy the url.
- Type 'git clone' and the url you copied in the terminal.
- Type 'cd' and the repository name in the terminal (assignment-2-ai-app-xinqiyue).
- Type node 'server.js' to start the app
- Copy the url it returns in any web browser like chrome
- You can now see main interface of the app and try to create decisions and options to make a choice.
- see the video to see more detailed explanation on how to use the website.
- The video link is here: https://drive.google.com/file/d/1J41wNNidZiNJM2TVjd59oxr2iKD3bD-4/view?usp=sharing

## Usage of AI
- Use ChatGPT-4o for all the code.
- I only come up with the idea of creating an app to make a choice.
- To get the start code and the structure of the project, I put the user story to ChatGPT, using the following prompt "I want to make a website that allows you to input a choice and then randomly select one. For example, you can input 10 restaurants you want to eat at and randomly select one. Users can change the decision options, add decision options, and delete options. Please help me write all the front-end and back-end codes and give me the storage path".
- I also use prompts like "write style.css to make the website looks better" and "change style.css to align all buttons" to adjust the website
