import express from "express";
import cors from "cors";
import { DocumentRouter, ErrorHandler, FolderRouter } from "./api/index.js";

const ExpressApp = async (app) => {
      app.use(express.json());

      app.use(cors());

      FolderRouter(app);

      DocumentRouter(app)

      app.use(ErrorHandler);
};

export default ExpressApp;
