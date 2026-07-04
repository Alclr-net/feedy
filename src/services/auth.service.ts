import mongoose from "mongoose";
import { UserModel } from "@/models/user.model";
import { ApiError } from "@/helpers/ApiError";
import { verifyCode } from "../utils/extras";
import { User } from "@/types/global";
export const searchByUserNameService = async (username: string) => {
  try {
    const data = await UserModel.findOne({
      username,
      isVerified: true,
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Retry Again", [], "");
  }
};
export const searchByEmailService = async (email: string) => {
  try {
    const data = await UserModel.findOne({ email });
    return data;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Retry Again", [], "");
  }
};
export const createUserService = async (
  username: string,
  email: string,
  password: string,
  verifyCode: number,
  expiresIn: Date
) => {
  try {
    const data = await UserModel.create({
      username,
      email,
      password,
      verifyCode,
      expiresIn,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Retry Again", [], "");
  }
};
export const findUserByUsernameAndEmailService = async ({
  identifier,
}: {
  identifier: string;
}) => {
  try {
    const data = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    return data;
  } catch (error) {
    throw new Error("Retry Again");
  }
};
export const getUserById = async (id: string) => {

  try {
    const data = await UserModel.findById(id).select(
      "_id email username isVerified verifyCode refreshToken isAcceptingMessages"
    );
    return data;
  } catch (error) {
    throw new Error("Retry Again");
  }
};
export const createUserForOauthService = async ({
  username,
  email,
  isVerified,
  provider
}: {
  username: string;
  email: string;
  isVerified: boolean;
  provider: string;
}) => {
  try {
    const data = await UserModel.create({
      username,
      email,
      verifyCode,
      isVerified,
      provider
    });
    return data;
  } catch (error) {
    throw new Error("Retry Again");
  }
};
