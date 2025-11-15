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
      navigate("/"); // Redirect to login
    },
    onError: () => alert("Invalid OTP or details"),
  });

  const onSubmit = (data: ResetPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register("email")}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          placeholder="OTP"
          {...register("otp")}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.otp && <p>{errors.otp.message}</p>}

        <input
          type="password"
          placeholder="New Password"
          {...register("newPassword")}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.newPassword && <p>{errors.newPassword.message}</p>}

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
