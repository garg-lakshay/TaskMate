import { useState } from "react";
import {
  createTodo,
  getTodos,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../api/todo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoPage() {
  const queryClient = useQueryClient();
  

  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch Todos
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Create Todo Mutation
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
  queryKey: ["todos"],
});

      setForm({ title: "", description: "" });
    },
  });

  // Update Todo Mutation
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
  queryKey: ["todos"],
});

      setEditId(null);
      setForm({ title: "", description: "" });
    },
  });

  // Delete Todo Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
  queryKey: ["todos"],
});

    },
  });

  // Toggle Complete Mutation
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
  queryKey: ["todos"],
});

    },
  });

  const handleSubmit = () => {
    if (editId) {
      updateMutation.mutate({
        id: editId,
        title: form.title,
        description: form.description,
      });
    } else {
      createMutation.mutate(form);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Todo List</h2>

      <div>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update Todo" : "Create Todo"}
        </button>

        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setForm({ title: "", description: "" });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>

      <hr />

      <ul>
        {todos?.map((todo: any) => (
          <li
            key={todo._id}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
              background: todo.completed ? "#d3ffd3" : "#fff",
            }}
          >
            <h3>
              {todo.title}
              {todo.completed && " ✓"}
            </h3>

            <p>{todo.description}</p>

            <button onClick={() => toggleMutation.mutate(todo._id)}>
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setEditId(todo._id);
                setForm({
                  title: todo.title,
                  description: todo.description,
                });
              }}
            >
              Edit
            </button>

            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => deleteMutation.mutate(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
