import Task from '../models/taskModel.js';

const getTasks = async (_, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.staus(500).json({ msg: err.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { text, isComplete } = req.body;
    const task = await Task.create({ text, isComplete });
    res.status(201).json(task);
  } catch (err) {
    res.staus(500).json({ msg: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.staus(500).json({ msg: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id);
    task.text = req.body.text;
    task.isComplete = req.body.isComplete;
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.staus(500).json({ msg: err.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id);
    task.text = task.text;
    task.isComplete = !task.isComplete;
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.staus(500).json({ msg: err.message });
  }
};

export { getTasks, addTask, deleteTask, updateTask, completeTask };
