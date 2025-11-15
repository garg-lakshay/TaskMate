import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "../schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.token);
      alert("Login Successful!");
      navigate("/todos");
    },
    onError: () => {
      alert("Invalid credentials");
    },
  });

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data);
  };

  return (
    <div style={outerWrapper}>
      <div style={card}>
        <h2 style={heading}>Welcome Back 👋</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={label}>Email</label>
          <input
            {...register("email")}
            placeholder="example@mail.com"
            style={input}
          />
          {errors.email && <p style={error}>{errors.email.message}</p>}

          <label style={label}>Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            style={input}
          />
          {errors.password && <p style={error}>{errors.password.message}</p>}

          <button type="submit" style={button}>
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={smallText}>
          <Link style={forgotLink} to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p style={bottomText}>
          Don't have an account?{" "}
          <Link style={link} to="/signup">
            Signup
          </Link>
        </p>

        <p style={signature}>
          © 2025 TaskMate — <b>Lakshay Garg</b>
        </p>
      </div>
    </div>
  );
}

/* ------------------- STYLES ------------------- */

const outerWrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
  padding: "20px",
} as const;

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "white",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
} as const;

const heading = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "28px",
  fontWeight: 600,
} as const;

const label = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
} as const;

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d0d0d0",
  marginBottom: "10px",
  fontSize: "15px",
} as const;

const error = {
  color: "red",
  fontSize: "13px",
  marginBottom: "10px",
} as const;

const button = {
  width: "100%",
  padding: "12px",
  background: "#0070f3",
  color: "white",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "10px",
  border: "none",
  marginTop: "10px",
  cursor: "pointer",
} as const;

const smallText = {
  textAlign: "right",
  marginTop: "8px",
} as const;

const forgotLink = {
  color: "#ff4f4f",
  fontWeight: 600,
  textDecoration: "none",
} as const;

const bottomText = {
  textAlign: "center",
  marginTop: "16px",
  fontSize: "15px",
} as const;

const link = {
  color: "#0070f3",
  fontWeight: 600,
  textDecoration: "none",
} as const;

const signature = {
  marginTop: "25px",
  textAlign: "center",
  fontSize: "14px",
  color: "#777",
} as const;
