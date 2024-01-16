import fastifySwagger from "@fastify/swagger";
import { FastifyInstance } from "fastify";

export async function loadSwagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      // externalDocs: {
      //   url: "https://swagger.io",
      //   description: "Find more info here",
      // },
      host: "0.0.0.0:3333",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });
}
