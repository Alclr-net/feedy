import mongoose from "mongoose";
import { UserModel } from "@/models/user.model";
// import { MessageModel } from "@/models/message.model";
import { ApiError } from "@/helpers/ApiError";
export const getUserMessages = async (id: string) => {
   
    try {
        const data = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "message",
                    foreignField: "_id",
                    as: "messagesData",
                    pipeline: [
                        {
                            $project: {
                                content: 1,
                                createdAt: 1,
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    messagesData:1
                },
            },
        ]);
        return data;
    } catch (error) {
        throw new ApiError(500, "Retry Again", [], "");
    }
};
export const updateUserMessageService = async function ({
    username,
    messageId,
}: {
    username: string;
    messageId: string;
}) {
    try {
        const data = await UserModel.findOneAndUpdate(
            {username},
            {
                $push: { message: messageId },
            },
            {new:true}
        );
        return data;
    } catch (error) {
        
        throw new ApiError(500, "Retry Again", [], "");
    }
};
export const deleteUserMessageService = async function ({
    userId,
    messageId,
}: {
    userId: string;
    messageId: string;
}) {
    try {
        const data = await UserModel.findByIdAndUpdate(
            new mongoose.Types.ObjectId(userId),
            {
                $pull: { message: messageId },
            },
        );
        return data;
    } catch (error) {
        
        throw new ApiError(500, "Retry Again", [], "");
    }
};
export const userAcceptanceUpdationservice = async ({
    id,
    isAcceptingMessages,
}: {
    id: string;
    isAcceptingMessages: boolean;
}) => {
    try {
        const data = await UserModel.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id),
          { $set: { isAcceptingMessages }},
          {new:true}
        );
        return data;
    } catch (error) {
        
        throw new ApiError(500, "Retry Again", [], "");
    }
};
