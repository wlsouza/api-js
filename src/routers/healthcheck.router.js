import express from "express";
import * as healthcheckController from "../controllers/healthcheck.controller.js";

export const router = express.Router()

router.get("/", healthcheckController.healthcheck)
