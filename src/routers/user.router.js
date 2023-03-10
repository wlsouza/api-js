import express from "express";
import * as userController from "../controllers/user.controller.js";

export const router = express.Router()

router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", userController.putUpdate);
