import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAdmin } from "../middlewares/adminAuthorization.middleware";
import { UserSchema } from "../schemas/userSchema";
import { create, list, getProfile, update, deleteProfile } from './../controllers/user.controller';

const router = Router();

export const userRouter = () => {
    
    router.post('', validate(UserSchema), create);
    router.get('', isAuthenticated, isAdmin, list);
    router.get('/profile', isAuthenticated, getProfile);
    router.patch('/:uuid', isAuthenticated, update);
    router.delete('/:uuid', isAuthenticated, deleteProfile);

    return router;
}