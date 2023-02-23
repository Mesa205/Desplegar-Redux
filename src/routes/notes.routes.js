import notesCtrl from "../controllers/notes.controller.js";
import { notesValid } from "../validSchemas/notesValid.js";

export const notesRoutes = (fastify, opts, done) => {
  fastify.get("/", notesCtrl.listAll);
  fastify.get("/:id", notesCtrl.listById);
  fastify.post("/", { schema: notesValid }, notesCtrl.create);
  fastify.delete("/:id", notesCtrl.delete);
  fastify.put("/:id", notesCtrl.update);

  done();
};
