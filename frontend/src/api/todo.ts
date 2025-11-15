import api from "./axios";

export const createTodo = async (data: { title: string; description: string }) => {
  const res = await api.post("/todos", data);
  return res.data;
};

export const getTodos = async () => {
  const res = await api.get("/todos");
  return res.data;
};

export const updateTodo = async (params: {
  id: string;
  title: string;
  description: string;
}) => {
  const res = await api.put(`/todos/${params.id}`, {
    title: params.title,
    description: params.description,
  });
  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};

export const toggleTodo = async (id: string) => {
  const res = await api.patch(`/todos/${id}/toggle`);
  return res.data;
};
