import fastifyCors from "@fastify/cors";
import { FastifyInstance } from "fastify";

const allowedUrls = ["0.0.0.0:3333"];

export function loadCors(fastify: FastifyInstance) {
  fastify.register(fastifyCors, {
    origin: allowedUrls,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "accept"],
    exposedHeaders: ["Content-Disposition"],
  });
}
