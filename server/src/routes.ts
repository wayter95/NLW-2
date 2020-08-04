import express from "express";

import ClassesController from "./controllers/ClassesController";

const classesController = new ClassesController();

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({
    message: "Api Inicialized",
  });
});

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.index);

export default routes;
