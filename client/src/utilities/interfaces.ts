// ts types

export interface Post {
  _id: string;
  username: string;
  media: string;
  likesCount: number;
  caption: string;
  commentsCount: number;
  isReel: boolean;
}

export interface User {
  _id: string;
  username: string;
  profile: string;
  fullname: string;
}

export interface UserDetail{
  _id:string
  username:string
  profile:string
  fullname:string
  bio:string
  gender:string
  totalPosts:number
}
export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}