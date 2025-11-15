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
    <div style={outerWrapper}>
      <div style={card}>
        <h2 style={heading}>Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={label}>Name</label>
          <input {...register("name")} placeholder="John Doe" style={input} />
          {errors.name && <p style={error}>{errors.name.message}</p>}

          <label style={label}>Email</label>
          <input
            {...register("email")}
            placeholder="example@gmail.com"
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
            {mutation.isPending ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p style={bottomText}>
          Already have an account?{" "}
          <Link style={link} to="/">
            Login
          </Link>
        </p>

        {/* Signature */}
        <p style={signature}>© 2025 TaskMate — <b>Lakshay Garg</b></p>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const outerWrapper: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
  padding: "20px",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: "420px",
  background: "white",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
};

const heading: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "28px",
  fontWeight: 600,
};

const label: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d0d0d0",
  marginBottom: "10px",
  fontSize: "15px",
};

const error: React.CSSProperties = {
  color: "red",
  fontSize: "13px",
  marginBottom: "10px",
};

const button: React.CSSProperties = {
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
};

const bottomText: React.CSSProperties = {
  textAlign: "center",
  marginTop: "16px",
  fontSize: "15px",
};

const link: React.CSSProperties = {
  color: "#0070f3",
  fontWeight: 600,
  textDecoration: "none",
};

const signature: React.CSSProperties = {
  marginTop: "25px",
  textAlign: "center",
  fontSize: "14px",
  color: "#777",
};
