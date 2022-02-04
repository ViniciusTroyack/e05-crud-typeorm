import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import ErrorClass from '../error/ErrorClass';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userAdmin = req.user?.isAdmin

    if(!userAdmin){
        return next(new ErrorClass('Missing admin permissions', 401));
    }
}