import mongoose from "mongoose";
import { MessageModel } from "@/models/message.model";
import { ApiError } from "@/helpers/ApiError";

export const createMessageService = async ({
    content,
    createdAt,
}: {
    content: string;
    createdAt: Date;
}) => {
    try {
        const data = MessageModel.create({ content, createdAt });
        return data;
    } catch (error) {
        throw new ApiError(500, "Retry Again", [], "");
    }
};
export const deleteMessageService = async (messageId: string) => {
    try {
        const data = MessageModel.findByIdAndDelete(
            new mongoose.Types.ObjectId(messageId),
        );
        return data;
    } catch (error) {
        throw new ApiError(500, "Retry Again", [], "");
    }
};
