import express from "express";
import cors from "cors";
import { ErrorHandler, VersionRouter } from "./api/index.js";

const ExpressApp = async (app) => {
      app.use(express.json());

      app.use(cors());

      VersionRouter(app);

      app.use(ErrorHandler);
};

export default ExpressApp;
