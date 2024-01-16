import { FastifyReply, FastifyRequest } from "fastify";
import { TodoParams, ITodo } from "../schemas/todo.schema";
import data from "../data";
const { v4 } = require("uuid");

let todoData = data;

export const getAllTodos = async (req: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ todos: todoData });
};

export const getTodoById = async (
  req: FastifyRequest<{ Params: TodoParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params;

  const todo = todoData.find((item) => item._id === id);
  if (!todo) return reply.code(404).send({ message: "Todo Not Found!" });
  return reply.code(200).send(todo);
};

export const createTodo = async (
  req: FastifyRequest<{ Body: ITodo }>,
  reply: FastifyReply
) => {
  const { description, title } = req.body;
  const todo = {
    _id: v4(),
    title,
    description,
  };
  todoData = [...todoData, todo];
  return reply.code(201).send({ message: "Todo successfully created" });
};

export const updateTodo = async (
  req: FastifyRequest<{ Params: TodoParams; Body: ITodo }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const { description, title } = req.body;
  todoData = todoData.map((todo) =>
    todo._id === id
      ? {
          _id: todo._id,
          title: title ? title : todo.title,
          description: description ? description : todo.description,
        }
      : todo
  );
  const todo = todoData.find((todo) => todo._id === id);
  return reply.code(200).send({ message: `${id} successfully updated!` });
};

export const deleteTodo = async (
  req: FastifyRequest<{ Params: TodoParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  todoData = todoData.filter((todo) => todo._id !== id);
  return reply.code(200).send({ message: `Todo ${id} has been removed` });
};
