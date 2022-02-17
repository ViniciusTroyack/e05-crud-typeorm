import { Express } from "express";

import { userRouter } from "./user.router";
import { loginRouter } from "./login.router";

export const initRouter = (app: Express) => {
    app.use("/users", userRouter())
    app.use("/login", loginRouter())
}