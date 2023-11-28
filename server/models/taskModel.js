import { Schema, model } from 'mongoose';

const taskModel = new Schema(
  {
    text: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Task = model('tasks', taskModel);

export default Task;
