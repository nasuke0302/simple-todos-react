import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/db/tasksCollection";
import "../imports/db/tasksMethods";
import "../imports/db/tasksPublications";

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    createdAt: new Date(),
    userId: user._id,
  });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({ username: SEED_USERNAME, password: SEED_PASSWORD });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});
