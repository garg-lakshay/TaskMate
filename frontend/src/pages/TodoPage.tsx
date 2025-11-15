import { useState } from "react";
import {
  createTodo,
  getTodos,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../api/todo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function TodoPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken); // For logout

  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch Todos
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Create Todo
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setForm({ title: "", description: "" });
    },
  });

  // Update Todo
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditId(null);
      setForm({ title: "", description: "" });
    },
  });

  // Delete Todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Toggle complete
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
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

  const handleLogout = () => {
    setToken(""); // clear token
    navigate("/login"); // redirect
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={pageWrapper}>

      {/* LOGOUT BUTTON */}
      <div style={logoutContainer}>
        <button onClick={handleLogout} style={logoutButton}>
          Logout
        </button>
      </div>

      <h1 style={welcome}>Welcome to TaskMate 👋</h1>
      <p style={subWelcome}>Manage your daily tasks easily</p>

      {/* Create / Update Form */}
      <div style={card}>
        <h2 style={heading}>{editId ? "Update Todo" : "Create a Todo"}</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={input}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={input}
        />

        <button onClick={handleSubmit} style={buttonPrimary}>
          {editId ? "Update Todo" : "Add Todo"}
        </button>

        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setForm({ title: "", description: "" });
            }}
            style={buttonSecondary}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Todo List */}
      <div style={todoListWrapper}>
        <h2 style={heading}>Your Tasks</h2>

        {todos?.length === 0 && <p>No todos yet. Start creating!</p>}

        {todos?.map((todo: any) => (
          <div
            key={todo._id}
            style={{
              ...todoCard,
              background: todo.completed ? "#d3ffd3" : "white",
            }}
          >
            <h3 style={todoTitle}>
              {todo.title} {todo.completed && " ✓"}
            </h3>
            <p style={todoDesc}>{todo.description}</p>

            <div style={todoActions}>
              <button
                onClick={() => toggleMutation.mutate(todo._id)}
                style={buttonSmall}
              >
                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>

              <button
                onClick={() => {
                  setEditId(todo._id);
                  setForm({
                    title: todo.title,
                    description: todo.description,
                  });
                }}
                style={buttonSmall}
              >
                Edit
              </button>

              <button
                onClick={() => deleteMutation.mutate(todo._id)}
                style={buttonDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <p style={signature}>© 2025 TaskMate — <b>Lakshay Garg</b></p>
    </div>
  );
}

/* -------------------- STYLES --------------------- */

const pageWrapper = {
  maxWidth: "700px",
  margin: "40px auto",
  padding: "20px",
  position: "relative",
} as const;

const logoutContainer = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "10px",
} as const;

const logoutButton = {
  padding: "10px 18px",
  background: "red",
  color: "white",
  borderRadius: "8px",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
} as const;

const welcome = {
  textAlign: "center",
  fontSize: "32px",
  fontWeight: 700,
} as const;

const subWelcome = {
  textAlign: "center",
  fontSize: "16px",
  color: "#555",
  marginBottom: "30px",
} as const;

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
  marginBottom: "30px",
} as const;

const heading = {
  marginBottom: "15px",
  fontWeight: 600,
} as const;

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px",
  fontSize: "15px",
} as const;

const buttonPrimary = {
  width: "100%",
  padding: "12px",
  background: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
} as const;

const buttonSecondary = {
  width: "100%",
  padding: "12px",
  background: "#ccc",
  color: "black",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "8px",
  fontWeight: 600,
} as const;

const todoListWrapper = {
  marginTop: "20px",
} as const;

const todoCard = {
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginBottom: "15px",
} as const;

const todoTitle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 600,
} as const;

const todoDesc = {
  margin: "6px 0 12px 0",
  fontSize: "15px",
} as const;

const todoActions = {
  display: "flex",
  gap: "10px",
} as const;

const buttonSmall = {
  padding: "8px 12px",
  borderRadius: "8px",
  background: "#0070f3",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
} as const;

const buttonDelete = {
  padding: "8px 12px",
  borderRadius: "8px",
  background: "red",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
} as const;

const signature = {
  marginTop: "30px",
  textAlign: "center",
  color: "#777",
} as const;
