import { Express } from "express";

import { userRouter } from "./user.router";

export const initRouter = (app: Express) => {
    app.use("", userRouter())
}