import { loginController } from "./login/loginController";
import * as accountManager from "./account";
import * as moviesManager from "./movies";
import * as fetcher from "./fetcher";
import {
  fetcherConfig,
  ITokenSuccess,
  RequestError,
  RequestSuccess,
} from "../../types/fetchingTypes";
import { IUserId } from "../../types/accountTypes";
import { IFavouriteMoviesList, IMovie } from "../../types/moviesTypes";

export default class moviesAPI {
  // **************************************************
  // ****************** GETTERS ***********************
  // **************************************************

  public static async getToken(): Promise<ITokenSuccess | RequestError> {
    return accountManager.getToken();
  }

  // **************************************************
  public static async getUserId(
    userId: string
  ): Promise<IUserId | RequestError> {
    return accountManager.getUserId(userId);
  }

  // **************************************************
  public static async getMovie(
    movieId: string
  ): Promise<RequestSuccess<IMovie> | RequestError> {
    return moviesManager.getMovie(movieId);
  }

  // **************************************************
  public static async getPopularMovies(): Promise<
    RequestSuccess<IMovie[]> | RequestError
  > {
    return moviesManager.getPopularMovies();
  }

  // **************************************************
  public static async getFavouriteMovies(
    userId: string,
    sessionId: string
  ): Promise<IFavouriteMoviesList | RequestError> {
    return accountManager.getFavouriteMovies(userId, sessionId);
  }

  // **************************************************
  public static async setFavourite(
    accountId: string,
    sessionId: string,
    movieId: string,
    isFavourite: boolean
  ) {
    return accountManager.setFavourite(
      accountId,
      sessionId,
      movieId,
      isFavourite
    );
  }

  // **************************************************
  public static async isFavourite(
    userId: string,
    sessionId: string,
    movieId: string
  ) {
    return accountManager.isFavourite(userId, sessionId, movieId);
  }

  // **************************************************
  // *************** FETCH HANDLER ********************
  // **************************************************

  public static async fetcher<T>(
    config: fetcherConfig
  ): Promise<RequestSuccess<T> | RequestError> {
    return fetcher.fetch(config);
  }

  // **************************************************
  // *************** LOGIN CONTROL ********************
  // **************************************************

  public static async loginControl(sessionId: string | undefined) {
    return await loginController(sessionId);
  }
}
