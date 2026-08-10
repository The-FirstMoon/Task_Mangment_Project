import { errorHandler } from "./middleware/error.middleware";
import express from 'express';
import authRouter from './modules/auth/auth.router';
import user from "./modules/users/user.router"

const app = express()
app.use(express.json())

app.use("/auth",authRouter)
app.use("/user", user)

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "School API is running",
  });
});
app.use(errorHandler);
export default app;