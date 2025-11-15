import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from "../schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => alert("OTP sent to your email"),
    onError: () => alert("Failed to send OTP"),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter your email"
          {...register("email")}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}
