import { Router } from "express";
import { getAuthenticatedUser, loginUser, registerUser, updateUser } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create user router
const userRouter = Router();

// Define routes
userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

userRouter.patch('/users/:id', updateUser);

userRouter.get('/users/me', isAuthenticated, getAuthenticatedUser);

// Export routes
export default userRouter;