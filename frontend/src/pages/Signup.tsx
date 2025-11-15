import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "../schemas/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      alert("Signup Successful!");
      navigate("/");
    },
    onError: () => {
      alert("Signup Failed");
    },
  });

  const onSubmit = (data: SignupInput) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register("name")}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          placeholder="Email"
          {...register("email")}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
