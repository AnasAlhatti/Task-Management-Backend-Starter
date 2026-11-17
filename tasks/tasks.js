import { getUser } from "../users/users.js";

const tasks = [];
let nextId = 1;

function validateTitle(title) {
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Task title must be a non-empty string.");
  }
}

export function createTask(title, userId) {
  validateTitle(title);
  if (!getUser(userId)) {
    throw new Error("Task must belong to an existing user.");
  }

  const task = { id: nextId++, title: title.trim(), completed: false, userId };
  tasks.push(task);
  return { ...task };
}

export function listTasks() {
  return tasks.map((task) => ({ ...task }));
}

export function getTask(id) {
  const task = tasks.find((task) => task.id === id);
  return task ? { ...task } : null;
}

// A task's title and completed state can change; its ID and owner stay fixed.
export function updateTask(id, { title, completed } = {}) {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error("Task not found.");
  }

  // Validate everything before changing stored data.
  if (title !== undefined) validateTitle(title);
  if (completed !== undefined && typeof completed !== "boolean") {
    throw new Error("Task completed must be a boolean.");
  }

  if (title !== undefined) task.title = title.trim();
  if (completed !== undefined) task.completed = completed;
  return { ...task };
}

export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}
