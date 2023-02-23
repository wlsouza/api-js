import express from "express";
import {router as healthcheckRouter} from "./src/routers/healthcheck.router.js";
import {router as userRouter} from "./src/routers/user.router.js";


const app = express();
const port = 3000;

app.use(express.json())
app.use("/healthcheck", healthcheckRouter)
app.use("/users", userRouter)

app.listen(port, ()=> console.log(`server started at port ${port}`));