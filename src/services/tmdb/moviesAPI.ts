import axios from "axios";

const host = "https://api.themoviedb.org/3/";

export default class moviesAPI {
  // **************************************************
  // ****************** GETTERS ***********************
  // **************************************************

  public static async getToken(): Promise<ITokenSuccess | RequestError> {
    const data = await this.fetcher<ITokenSuccess>({
      endpointType: "getToken",
    });

    if (!data.success) {
      return data;
    }

    return {
      success: true,
      expires_at: data.payload.expires_at,
      request_token: data.payload.request_token,
    };
  }

  // **************************************************
  public static async getUserId(
    userId: string
  ): Promise<IUserId | RequestError> {
    const data = await this.fetcher<IUserIdSuccess>({
      endpointType: "getUserId",
      userId,
    });
    console.log(data);

    if (!data.success) {
      return data;
    }

    return {
      userId: data.payload.id,
    };
  }

  public static async getMovie(movieId: string): Promise<any | RequestError> {
    const data = await this.fetcher<any>({ endpointType: "getMovie" });
    console.log(data);

    if (!data.success) {
      return data;
    }

    return {
      movieData: data.payload,
    };
  }

  public static async getPopularMovies(): Promise<any | RequestError> {
    const data = await this.fetcher<any>({ endpointType: "getPopularMovies" });
    console.log(data);

    if (!data.success) {
      return data;
    }

    return {
      popularMovies: data.payload.results,
    };
  }

  // **************************************************
  public static async getFavouriteMovies(
    userId: string,
    sessionId: string
  ): Promise<IFavouriteMoviesList | RequestError> {
    const data = await this.fetcher<IMoviesSuccess>({
      endpointType: "getFavouriteMovies",
      sessionId,
      userId,
    });
    console.log(data);

    if (!data.success) {
      return data;
    }

    return {
      favouriteMoviesList: data.payload.results,
    };
  }

  // **************************************************
  // *************** FETCH HANDLER ********************
  // **************************************************

  private static async fetcher<T>(
    config: fetcherConfig
  ): Promise<RequestSuccess<T> | RequestError> {
    let URL = "";
    console.log(config.endpointType);

    if (config.endpointType === "getMovie") {
      URL =
        "https://api.themoviedb.org/3/movie/popular?api_key=0813f3326aa955f3707a6e8d13d652f7&language=en-US&page=1";
    }

    if (config.endpointType === "getPopularMovies") {
      URL =
        "https://api.themoviedb.org/3/movie/popular?api_key=0813f3326aa955f3707a6e8d13d652f7&language=en-US&page=1";
    }

    if (config.endpointType === "getToken") {
      URL =
        "https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7";
    }
    if (config.endpointType === "getUserId") {
      URL = `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${config.sessionId}`;
      if (!config.sessionId)
        return {
          success: false,
          errorMessage: "Invalid parameter",
        };
    }
    if (config.endpointType === "getFavouriteMovies") {
      URL = `https://api.themoviedb.org/3/account/${config.userId}/favorite/movies?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${config.sessionId}&language=en-US&sort_by=created_at.asc&page=1`;
      if (!config.sessionId || !config.userId)
        return {
          success: false,
          errorMessage: "Invalid parameter",
        };
    }

    if (URL === "")
      return {
        success: false,
        errorMessage: "Invalid parameter",
      };

    try {
      const data = await axios.get(URL).then((response) => response.data);
      console.log(data);

      return {
        success: true,
        payload: data,
      };
    } catch (err) {
      return {
        success: false,
        errorMessage: err as string,
      };
    }
  }

  // **************************************************
  // *************** LOGIN CONTROL ********************
  // **************************************************

  public static async loginControl(sessionId: string | undefined) {
    const timeStamp = new Date(Date.now()).toUTCString();

    // Check if cookie exists
    if (sessionId === "NOT_AUTHORIZED" || sessionId === undefined) {
      return {
        isLoggedIn: false,
        isAuth: false,
        sessionId: "NOT_AUTHORIZED",
        userId: "NOT_FOUND",
        message: "Invalid sessionId value",
        lastValidated: timeStamp,
      };
    }

    // If cookie exists, check if session is still valid
    const data = await fetch(
      `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`
    ).then((res) => res.json());

    console.log(data);

    if (data.success === false) {
      return {
        isLoggedIn: true,
        isAuth: false,
        sessionId: "NOT_AUTHORIZED",
        userId: "NOT_FOUND",
        message: "SessionId rejected",
        lastValidated: timeStamp,
      };
    }

    return {
      isLoggedIn: true,
      isAuth: true,
      sessionId: sessionId,
      userId: data.id,
      message: "SessionId accepted",
      lastValidated: timeStamp,
    };
  }
}

// **************************************************
// ********************* TYPES **********************
// **************************************************

interface ITokenSuccess {
  success: boolean;
  expires_at: string;
  request_token: string;
}

interface IUserIdSuccess {
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

interface IUserId {
  userId: string;
}

interface IFavouriteMoviesList {
  favouriteMoviesList: Array<any>;
}

export type RequestError = {
  success: false;
  errorMessage: string;
};

export type RequestSuccess<T> = {
  success: true;
  payload: T;
};

interface IMoviesSuccess {
  page: string;
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      genre_ids: Array<string>;
      id: string;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: string;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: string;
      vote_count: string;
    }
  ];
  total_pages: string;
  total_results: string;
}

interface fetcherConfig {
  endpointType: string;
  sessionId?: string;
  userId?: string;
  movieId?: string;
}
