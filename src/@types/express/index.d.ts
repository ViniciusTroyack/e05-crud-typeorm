declare namespace Express {
    interface Request {
        user?: { isAdmin?: boolean,
                id?: string},
    }
} 
