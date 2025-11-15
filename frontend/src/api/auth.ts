import api from "./axios";
import { SignupInput } from "../schemas/authSchemas";
import { LoginInput } from "../schemas/authSchemas";
import {
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../schemas/authSchemas";

// Signup User API
export const signupUser = async (data: SignupInput) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// Login User API
export const loginUser = async (data: LoginInput) => {
  const res = await api.post("/auth/login", data);
  return res.data; // Return the token received from backend
};

// Forgot Password API
export const forgotPassword = async (data: ForgotPasswordInput) => {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
};

// Reset Password API
export const resetPassword = async (data: ResetPasswordInput) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};