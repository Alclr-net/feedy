import mongoose, { Schema } from "mongoose";
import { User } from "@/types/global";
import argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      default: null
    },
    message: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    refreshToken: {
      type: String,
    },
    provider: [
      {
        type: String,
      },
    ],
    isAcceptingMessages: {
      type: Boolean,
      default: false
    },
    verifyCode: {
      type: Number,
    },
    codeExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await argon2.hash(this.password);
  next();
});
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return argon2.verify(this.password, password);
};
UserSchema.methods.generateAccessToken = async function () {

  const secret = process.env.ACCESS_TOKEN_SECRET as string;

  return jwt.sign(
    {
      _id: this._id.toString(),
      username: this.username,
      email: this.email,
      isVerified: this.isVerified,
      avatar: this.avatar,
      isAcceptingMessages:this.isAcceptingMessages
    },
    secret,
    { expiresIn: "15m" }
  );
};
UserSchema.methods.generateRefreshToken = async function () {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;
  return jwt.sign(
    {
      _id: this._id,
    },
    secret,
    { expiresIn: "1w" }
  );
};
UserSchema.plugin(aggregatePaginate)
export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
