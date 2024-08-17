import { Schema, models, model } from "mongoose";

const taskSchema = new Schema({
  task: {
    type: String,
    required: [true, "Task is required"],
    unique: true,
    trim: true,
  },
});

const Task = models.task || model("task", taskSchema);

export default Task;
