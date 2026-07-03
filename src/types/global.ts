import { Document } from "mongoose";
export interface Message extends Document {
  content: string;
  createdAt: Date;
}
export interface User extends Document {
  username: string;
  avatar: string;
  email: string;
  password: string;
  message: Message[];
  refreshToken:string;
  provider:string[];
  verifyCode:number;
  isAcceptingMessages:Boolean;
  codeExpiry:Date;
  isVerified:boolean;
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect:(password:string)=>Promise<boolean>
}

export interface ApiResponse {
  success:boolean;
  message :string;
  isAcceptingMessage?:boolean;
  messages?:Message[];
  

}
export interface userState {
    name: string  | null;
    isVerified: boolean;
    isLoggedIn: boolean;

}
