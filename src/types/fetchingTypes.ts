export type RequestError = {
  success: false;
  errorMessage: string;
};

export type RequestSuccess<T> = {
  success: true;
  payload: T;
};

export interface ITokenSuccess {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface fetcherConfig {
  endpointType: string;
  sessionId?: string;
  userId?: string;
  movieId?: string;
}
