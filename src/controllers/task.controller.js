import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get tasks or a single task by ID
export const getTasks = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      // Fetch a single task by ID
      const task = await prisma.task.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!task) return res.status(404).json({ message: "Task not found" });
      return res.status(200).json(task);
    }
    // Fetch all tasks
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { title, color } = req.body;
  if (!title || !color) {
    return res.status(400).json({ message: "Title and color are required" });
  }
  try {
    const newTask = await prisma.task.create({
      data: { title, color },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;

  // Create a data object for fields that are provided in the request body
  const updatedData = {};

  // Only include the fields that are provided in the request body
  if (title !== undefined) updatedData.title = title;
  if (color !== undefined) updatedData.color = color;
  if (completed !== undefined) updatedData.completed = completed;

  // If no fields are provided, return a 400 response
  if (Object.keys(updatedData).length === 0) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update" });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: updatedData,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};
