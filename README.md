# Node.js To-Do App

## Overview

A simple to-do list application built with Node.js, HTML, CSS, and JavaScript. Users can add, edit, and delete tasks, with data persistence using a file-based JSON storage or a lightweight database.

## Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Basic front-end styling with CSS
- Server-side data storage using Node.js

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
- **Backend:** Node.js, Express.js
- **Storage:** JSON file or lowDB (optional lightweight database)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Altynadamn/todoo.git
   cd node-todo-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
4. Open `index.html` in your browser.

## API Endpoints

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Add a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Usage

1. Open the app in a browser.
2. Add a task by typing and pressing enter.
3. Click on a task to mark it as complete.
4. Use the delete button to remove a task.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Commit changes: `git commit -m "Add new feature"`.
4. Push the branch: `git push origin feature-branch`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.

