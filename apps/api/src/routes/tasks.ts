import { Router } from "express";
import * as taskController from "../controllers/taskController";

const router = Router();

router.get("/", taskController.listTasks);
router.post("/", taskController.createTask);
router.get("/:id", taskController.getTask);
router.patch("/:id", taskController.updateTask);
router.patch("/:id/archive", taskController.archiveTask);
router.post("/:id/comments", taskController.addComment);

export default router;
