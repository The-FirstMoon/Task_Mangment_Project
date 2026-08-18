import { errorHandler } from "./middleware/errorHandler";
import express, { Request, Response } from 'express';
import authRouter from './features/auth/auth.router';
import user from "./features/users/user.router"
import project from "./features/projects/project.router"
import task from "./features/tasks/task.router";
import comment from "./features/comments/comment.router";
import { swaggerSpec, swaggerUiServe, swaggerUiSetup } from "./config/swager";
import { notFound } from "./middleware/notFound";

const app = express()
app.use(express.json())

app.use("/auth",authRouter);
app.use("/user", user);
app.use("/project", project);
app.use("/task", task);
app.use("/comment", comment);

// Swagger router 
const swaggerAPI = (req : Request, res : Response) =>{
    res.json(swaggerSpec)
}
app.use("/api", swaggerAPI);
app.use('/api-docs', swaggerUiServe, swaggerUiSetup);

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Task Mangment API is running",
  });
});
app.use(notFound);
app.use(errorHandler);
export default app;