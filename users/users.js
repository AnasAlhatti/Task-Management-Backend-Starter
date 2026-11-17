// Data exists only in this Node.js process. Restarting clears it.
const users = [];
let nextId = 1;

export function createUser(name) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("User name must be a non-empty string.");
  }

  const user = { id: nextId++, name: name.trim() };
  users.push(user);
  return { ...user };
}

export function getUser(id) {
  const user = users.find((user) => user.id === id);
  return user ? { ...user } : null;
}

export function listUsers() {
  // Return copies so callers cannot accidentally change the stored users.
  return users.map((user) => ({ ...user }));
}
