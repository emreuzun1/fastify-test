import { FastifyInstance } from "fastify";
import { $ref } from "../schemas/todo.schema";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

const getAllTodosSchema = {
  tags: ["todos"],
  response: {
    default: $ref("allTodosResponse"),
  },
};

const postSchema = {
  tags: ["todos"],
  body: $ref("postTodoBody"),
  response: {
    201: $ref("todoSuccessMessage"),
  },
};

const putSchema = {
  tags: ["todos"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
  },
  body: $ref("putTodoBody"),
  response: {
    200: $ref("todoSuccessMessage"),
  },
};

const getByIdSchema = {
  tags: ["todos"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
  },
  response: {
    200: $ref("todoResponse"),
  },
};

const deleteSchema = {
  tags: ["todos"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
  },
  response: {
    200: $ref("todoSuccessMessage"),
  },
};

export async function todosRoutes(fastify: FastifyInstance) {
  fastify
    .get("/", { schema: getAllTodosSchema }, getAllTodos)
    .get("/:id", { schema: getByIdSchema }, getTodoById)
    .post("/", { schema: postSchema }, createTodo)
    .put("/:id", { schema: putSchema }, updateTodo)
    .delete("/:id", { schema: deleteSchema }, deleteTodo);
}
