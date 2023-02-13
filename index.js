import express from "express";
import { router as healthcheckRouter } from "./src/routers/healthcheck.router.js";

const app = express();


app.use("/healthcheck", healthcheckRouter)
app.listen(3000);