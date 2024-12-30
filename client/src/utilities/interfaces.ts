export interface Post {
  id: string;
  thumbnail: string;
  username: string;
  date: string;
  media: string;
  likes: number;
  caption: string;
}

export interface Stroy {
  id: string;
  username: string;
  thumbnail: string;
  media: string;
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
  email:string
  bio:string
  gender:string
}