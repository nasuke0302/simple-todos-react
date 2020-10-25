import { check } from "meteor/check";
import { TasksCollection } from "./tasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    TasksCollection.insert({
      text,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.remove({ _id: taskId });
  },
  "tasks.isChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.update({ _id: taskId }, { $set: { isChecked } });
  },
});
