import { Todo } from "@/types/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/todo`;

// GET
const GetTodo = async (): Promise<Todo> => {
  const res = await axios.get(URL);
  return res.data;
};
// POST
const PostTodo = async (data: Todo) => {
  const res = await axios.post(URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
// PUT
const PutTodo = async (id: number): Promise<Todo> => {
  const res = await axios.put(`${URL}/${id}`);
  return res.data;
};
// DELETE
const DeleteTodo = async (id: Number): Promise<void> => {
  await axios.delete(`${URL}/${id}`);
};

export { GetTodo, PostTodo, PutTodo, DeleteTodo };
