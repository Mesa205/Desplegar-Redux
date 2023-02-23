import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import { connectDb } from "./database.js";
import { notesRoutes } from "./routes/notes.routes.js";
import { optionsEnv } from "./configEnv.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyEnv, optionsEnv).ready((err) => {
  if (err) console.error(err);
  // console.log(fastify.config);
});

fastify.register(connectDb);
fastify.register(cors, { origin: "*" });
fastify.register(formBody);

//RUTAS
fastify.register(notesRoutes, { prefix: "/notes" });

const start = async () => {
  try {
    await fastify.ready();
    fastify.listen({ port: process.env.PORT, host: process.env.HOST });
    console.log("puerto conectado", process.env.PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
