import fastifySwaggerUI from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

export async function loadSwaggerUI(app: FastifyInstance) {
  await app.register(fastifySwaggerUI, {
    routePrefix: "/swagger",
  });
}
