import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    level: { type: String, default: "error" },
    message: String,
    stack: String,
    route: String,
    method: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    meta: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);
