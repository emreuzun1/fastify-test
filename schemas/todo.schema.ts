import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const todoZod = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
});

export const postTodoBody = todoZod;

export const todoSuccessMessage = z.object({
  message: z.string(),
});

export const todoParams = z.object({
  id: z.string(),
});

export const allTodosResponse = z.object({
  todos: z.array(todoZod),
});

export const putTodoBody = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const todoResponse = todoZod;

export type ITodo = z.infer<typeof todoZod>;
export type TodoParams = z.infer<typeof todoParams>;

export const { schemas: todoSchema, $ref } = buildJsonSchemas(
  {
    postTodoBody,
    todoParams,
    todoResponse,
    todoSuccessMessage,
    putTodoBody,
    allTodosResponse,
  },
  { $id: "TodoSchema" }
);
