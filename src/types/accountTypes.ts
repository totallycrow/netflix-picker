// ************** TYPES & INTERFACES **************

export interface ILoginData {
  isLoggedIn: boolean;
  isAuth: boolean;
  sessionId: string;
  userId: any;
  message: string;
  lastValidated: string;
}

export interface IUserIdSuccess {
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: null | string };
  };
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface IUserId {
  userId: string;
}
