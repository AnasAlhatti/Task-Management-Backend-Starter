import test from "node:test";
import assert from "node:assert/strict";
import { createUser, getUser, listUsers } from "../users/users.js";
import { createTask, getTask, listTasks, updateTask, deleteTask } from "../tasks/tasks.js";

test("users validate names and protect stored data from external changes", () => {
  assert.throws(() => createUser("  "), /non-empty string/);
  const user = createUser("  Aylin  ");
  assert.equal(user.name, "Aylin");
  user.name = "Changed outside the module";
  const listed = listUsers();
  listed.find((item) => item.id === user.id).name = "Also changed";
  assert.equal(getUser(user.id).name, "Aylin");
  assert.equal(getUser(-1), null);
});

test("tasks support CRUD, validate changes, and protect stored data", () => {
  const user = createUser("Deniz");
  const initialCount = listTasks().length;
  assert.throws(() => createTask("", user.id), /non-empty string/);
  assert.throws(() => createTask("Learn Node.js", -1), /existing user/);
  assert.equal(listTasks().length, initialCount);

  const task = createTask("  Learn Node.js  ", user.id);
  assert.deepEqual(getTask(task.id), {
    id: task.id, title: "Learn Node.js", completed: false, userId: user.id,
  });
  task.title = "External change";
  listTasks().find((item) => item.id === task.id).completed = true;
  assert.equal(getTask(task.id).title, "Learn Node.js");
  assert.equal(getTask(task.id).completed, false);

  assert.throws(() => updateTask(task.id, { title: "New title", completed: "yes" }), /boolean/);
  assert.equal(getTask(task.id).title, "Learn Node.js");
  assert.throws(() => updateTask(task.id, { title: " " }), /non-empty string/);
  const updated = updateTask(task.id, { title: "Practice modules", completed: true });
  assert.equal(updated.title, "Practice modules");
  assert.equal(updated.completed, true);
  updated.completed = false;
  assert.equal(getTask(task.id).completed, true);

  assert.equal(deleteTask(task.id), true);
  assert.equal(deleteTask(task.id), false);
  assert.equal(getTask(task.id), null);
  assert.throws(() => updateTask(task.id, { completed: false }), /not found/);
  assert.equal(listTasks().length, initialCount);
});
