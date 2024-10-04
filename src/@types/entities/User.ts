export interface User {
  userId: string;
  username: string;
  email: string;
  accessToken: string;
}

export interface ICurrentUser {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}
