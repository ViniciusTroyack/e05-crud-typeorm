import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAdmin } from "../middlewares/adminAuthorization.middleware";
import { UserSchema } from "../schemas/userSchema";
import { create, list, getProfile, update, deleteProfile } from './../controllers/user.controller';
import { login } from "../controllers/login.controller";

const router = Router();

export const userRouter = () => {
    
    router.post('/users', validate(UserSchema), create);
    router.post('/login', login);
    router.get('/users', isAuthenticated, isAdmin, list);
    router.get('/users/profile', isAuthenticated, getProfile);
    router.patch('/users/:uuid', isAuthenticated, update);
    router.delete('/users/:uuid', isAuthenticated, deleteProfile);

    return router;
}