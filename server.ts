import Fastify, { FastifyInstance } from "fastify";
import { loadSwagger } from "./config/swagger";
import { todosRoutes } from "./routes/todos";
import { loadSwaggerUI } from "./config/swagger-ui";
import { todoSchema } from "./schemas/todo.schema";
import { loadCors } from "./config/cors";

const fastify: FastifyInstance = Fastify({
  logger: true,
});

const start = async () => {
  loadCors(fastify);
  await loadSwagger(fastify);
  await loadSwaggerUI(fastify);
  const allSchemas = [...todoSchema];
  for (const schema of allSchemas) {
    fastify.addSchema(schema);
  }
  fastify.register(todosRoutes, { prefix: "/api/todos" });
  try {
    await fastify.listen({
      port: 3333,
      host: "0.0.0.0",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
