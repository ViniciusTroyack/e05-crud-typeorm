import { Request, Response, NextFunction } from "express";
import {createUser, listAll, getOne, updateUser, deleteUser} from "../services/user.service";
import ErrorClass from "../error/ErrorClass";

export const create = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await createUser(req.body);
        res.status(201).send(user);

    } catch (error) {
        next(error);
    }
}

export const list = async (req: Request, res: Response) => {
    
    const users = await listAll();

    res.send(users);
}

export const getProfile = async (req: Request, res: Response) => {
    const user = req.user 
    const profile = await getOne(user?.id);

    res.send(profile);

}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user;
    const currentUser = await getOne(loggedUser?.id);
    const { uuid } = req.params;
    const data = req.body;
    
    if("isAdmin" in data){
        return next(new ErrorClass('impossible to change isAdmin key', 401))
    }
   
    if(currentUser?.id != uuid && currentUser?.isAdmin !== true){
        return next(new ErrorClass('Missing admin permissions', 401))
    }

    const updatedUser = await updateUser(uuid, data)

    res.send(updatedUser)
}

export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user;
    const currentUser = await getOne(loggedUser?.id);
    const { uuid } = req.params;
   
    if(currentUser?.id != uuid && currentUser?.isAdmin !== true){
        return next(new ErrorClass('Missing admin permissions', 401))
    }

    const deletedUser = await deleteUser(uuid)

    res.send({message: "User deleted with success"})
}