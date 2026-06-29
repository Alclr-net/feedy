import mongoose, { Schema } from "mongoose";
import { Message } from "@/types/global";
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MessageModel =  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);
