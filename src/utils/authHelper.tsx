import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import User from "@/models/user";

interface SignupUserParams {
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function signupUser({
  email,
  password,
  name,
  role,
}: SignupUserParams) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    role,
  });

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  return { user, token };
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  return { user, token };
}
