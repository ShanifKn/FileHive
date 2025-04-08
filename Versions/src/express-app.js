import express from "express";
import cors from "cors";
import { ErrorHandler, UsersRouter } from "./api/index.js";

const ExpressApp = async (app) => {
      app.use(express.json());

      app.use(cors());

      UsersRouter(app);

      app.use(ErrorHandler);
};

export default ExpressApp;
