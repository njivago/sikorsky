export type IUser = {
  username: string;
  id: string;
};

export type IAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};