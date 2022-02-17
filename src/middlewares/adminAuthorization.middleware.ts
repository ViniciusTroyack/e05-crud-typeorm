import { Request, Response, NextFunction } from 'express';
import { getOne } from '../services/user.service';

import ErrorClass from '../error/ErrorClass';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user?.id

    const currentUser = await getOne(userID)

    if(!currentUser?.isAdmin){
        return next(new ErrorClass('Missing admin permissions', 401));
    }

    next();
}