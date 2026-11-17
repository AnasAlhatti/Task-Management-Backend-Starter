# Task Management Backend Starter

**Build with AI. Review, Run & Verify.**

Session 1 — Assignment

A minimal Node.js project using ESM (`"type": "module"`), separate Tasks and
Users modules, and in-memory data. It uses only built-in APIs, with no packages
or database. This is a terminal demo of backend logic; it does not start an HTTP server.

## Run

Install Node.js 22 or later and Git. Clone the project and run it:

```sh
git clone https://github.com/AnasAlhatti/Task-Management-Backend-Starter.git
cd Task-Management-Backend-Starter
npm start
```

If you already have the project, open a terminal in its folder. No `npm install`
is required. These npm commands work on Windows, macOS, and Linux.

```sh
npm start     # Run the demo once
npm run dev   # Rerun automatically when a source file changes; Ctrl+C to stop
npm test      # Run the built-in Node.js tests
```

Expected output from `npm start` (after npm's script header):

```text
Task Management Backend Starter
Users: [{"id":1,"name":"Aylin"}]
Tasks: [{"id":1,"title":"Learn Node.js modules","completed":false,"userId":1},{"id":2,"title":"Write the README","completed":false,"userId":1}]
Updated task: {"id":1,"title":"Practice Node.js modules","completed":true,"userId":1}
Deleted task: true
Remaining tasks: [{"id":2,"title":"Write the README","completed":false,"userId":1}]
```

## Project structure

```text
app.js                      Runs the example workflow
package.json                ESM setting and npm scripts
.gitignore                  Ignores dependencies, environment files, and logs
users/users.js              Creates, lists, and looks up users
tasks/tasks.js              Creates, lists, finds, updates, and deletes tasks
test/task-manager.test.js   Tests behavior with node:test and node:assert
```

## Module operations

| Function | Behavior |
| --- | --- |
| `createUser(name)` | Creates a user with a generated numeric ID |
| `listUsers()` | Returns all users |
| `getUser(id)` | Returns a user, or `null` if missing |
| `createTask(title, userId)` | Creates an incomplete task owned by an existing user |
| `listTasks()` | Returns all tasks |
| `getTask(id)` | Returns a task, or `null` if missing |
| `updateTask(id, { title, completed })` | Updates either or both fields; throws if the task is missing |
| `deleteTask(id)` | Returns `true` if deleted, otherwise `false` |

Names and titles must be non-empty strings; surrounding whitespace is trimmed.
`completed` must be a boolean when supplied. Invalid input throws an `Error`.
Task IDs and owners cannot be changed through `updateTask`.
The modules return copies of records so callers cannot mutate the stored data.

All data lives in module-level arrays. Every new run, including a watch-mode
restart, starts empty with IDs beginning at 1. Nothing is saved to disk.

## Review and verify

1. Read `app.js` and follow its imports to the two modules.
2. Run `npm start` and compare every line with the expected output.
3. Run `npm test`. Both tests should pass with no failures. They cover user
   validation, task CRUD, missing records, invalid updates, and data-copy behavior.
4. Run `npm run dev`, edit a demo task title in `app.js`, and save to see a rerun.
5. Explain why restarting clears the data and why a task needs an existing user.

## Push future changes to GitHub

After editing and verifying your changes, run from the project folder:

```sh
npm test
git add .
git commit -m "Describe your changes"
git push
```

Git must be installed and authenticated with GitHub. If Git asks for your author
identity, configure your Git name and email, then retry the commit.
