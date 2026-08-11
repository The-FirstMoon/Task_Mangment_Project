import { errorHandler } from "./middleware/errorHandler";
import express from 'express';
import authRouter from './features/auth/auth.router';
import user from "./features/users/user.router"
import project from "./features/projects/project.router"

const app = express()
app.use(express.json())

app.use("/auth",authRouter);
app.use("/user", user);
app.use("/project", project);

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Task Mangment API is running",
  });
});
app.use(errorHandler);
export default app;