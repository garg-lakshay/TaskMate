import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordInput,
} from "../schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert("Password reset successful!");
      navigate("/");
    },
    onError: () => alert("Invalid OTP or details"),
  });

  const onSubmit = (data: ResetPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <div style={outerWrapper}>
      <div style={card}>
        <h2 style={heading}>Reset Your Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={label}>Email</label>
          <input
            {...register("email")}
            placeholder="example@mail.com"
            style={input}
          />
          {errors.email && <p style={error}>{errors.email.message}</p>}

          <label style={label}>OTP</label>
          <input
            {...register("otp")}
            placeholder="Enter the OTP sent to your email"
            style={input}
          />
          {errors.otp && <p style={error}>{errors.otp.message}</p>}

          <label style={label}>New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            placeholder="••••••••"
            style={input}
          />
          {errors.newPassword && (
            <p style={error}>{errors.newPassword.message}</p>
          )}

          <button type="submit" style={button}>
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>

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
  fontSize: "26px",
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

const signature = {
  marginTop: "25px",
  textAlign: "center",
  fontSize: "14px",
  color: "#777",
} as const;
