import { Router } from "express";

import tasksRoutes from "./task.route.js";

const router = Router();

// Task Routes
router.use("/tasks", tasksRoutes);

export default router;
