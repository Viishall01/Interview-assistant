import mongoose, { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    resumeDetails: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      //   enum: ["admin", "interviewer", "interviewee"],
      default: "interviewee",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const User = models.User || model("User", userSchema);

export default User;
