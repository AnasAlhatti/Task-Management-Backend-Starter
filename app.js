import { createUser, listUsers } from "./users/users.js";
import { createTask, listTasks, getTask, updateTask, deleteTask } from "./tasks/tasks.js";

console.log("Task Management Backend Starter");

const user = createUser("Aylin");
console.log("Users:", JSON.stringify(listUsers()));

const task = createTask("Learn Node.js modules", user.id);
createTask("Write the README", user.id);
console.log("Tasks:", JSON.stringify(listTasks()));

updateTask(task.id, { title: "Practice Node.js modules", completed: true });
console.log("Updated task:", JSON.stringify(getTask(task.id)));

console.log("Deleted task:", deleteTask(task.id));
console.log("Remaining tasks:", JSON.stringify(listTasks()));
