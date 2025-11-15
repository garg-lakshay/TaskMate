import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from "../schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      alert("OTP sent to your email");
      navigate("/reset-password"); // <<< REDIRECT USER HERE
    },
    onError: () => alert("Failed to send OTP"),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <div style={outerWrapper}>
      <div style={card}>
        <h2 style={heading}>Forgot Your Password?</h2>
        <p style={subText}>Enter your email and we’ll send you an OTP.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={label}>Email</label>
          <input
            {...register("email")}
            placeholder="example@mail.com"
            style={input}
          />
          {errors.email && <p style={error}>{errors.email.message}</p>}

          <button type="submit" style={button}>
            {mutation.isPending ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p style={signature}>
          © 2025 TaskMate — <b>Lakshay Garg</b>
        </p>
      </div>
    </div>
  );
}

/* ----------------- STYLES ----------------- */

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
  marginBottom: "12px",
  fontSize: "26px",
  fontWeight: 600,
} as const;

const subText = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "15px",
  color: "#555",
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

const signature = {
  marginTop: "25px",
  textAlign: "center",
  fontSize: "14px",
  color: "#777",
} as const;
