import axios from "axios";

const host = "https://api.themoviedb.org/3/";

interface ITokenSuccess {
  success: boolean;
  expires_at: string;
  request_token: string;
}

interface ISessionSuccess {
  success: boolean;
  expires_at: string;
  request_token: string;
}

interface IRequestRejected {
  success: boolean;
  status_message: string;
  status_code: number;
}

interface IUserId {
  userId: string;
}

interface IFavouriteMoviesList {
  favouriteMoviesList: Array<any>;
}

export default class moviesAPI {
  public static async getToken(): Promise<ITokenSuccess | Error> {
    const data = await this.fetcher<ITokenSuccess>("getToken");
    console.log(data);
    return data;
  }

  public static async getUserId(userId: string): Promise<IUserId | Error> {
    const data = await this.fetcher<IUserId>("getUserId", userId);
    console.log(data);
    return data;
  }

  public static async getFavouriteMovies(
    userId: string,
    sessionId: string
  ): Promise<IFavouriteMoviesList | Error> {
    const data = await this.fetcher<IFavouriteMoviesList>(
      "getFavouriteMovies",
      sessionId,
      userId
    );
    console.log(data);
    return data;
  }

  private static async fetcher<T>(
    endpointType: string,
    sessionId?: string,
    userId?: string
  ): Promise<T | Error> {
    let URL = "";
    console.log(endpointType);

    if (endpointType === "getToken") {
      URL =
        "https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7";
    }
    if (endpointType === "getUserId") {
      URL = `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`;
      if (!sessionId) return new Error("Invalid sessionId parameter");
    }
    if (endpointType === "getFavouriteMovies") {
      URL = `https://api.themoviedb.org/3/account/${userId}/favorite/movies?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`;
      if (!sessionId || !userId) return new Error("Invalid parameter");
    }

    console.log(URL);

    if (!URL) return new Error("Invalid request");
    console.log(URL);

    try {
      const data = await axios.get(URL).then((response) => response.data);
      console.log(data);
      return data;
    } catch (err) {
      return err as Error;
    }
  }

  // const data = await fetch(
  //   `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`
  // ).then((res) => res.json());
  // console.log(data);

  // const movies = await fetch(
  //   `https://api.themoviedb.org/3/account/${data.id}/favorite/movies?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
  // ).then((movies) => movies.json());

  //   public static async get<T>(endpoint: string): Promise<T | Error> {
  //     const targetURL = host + endpoint;
  //     console.log(targetURL);
  //     try {
  //       const data = await axios.get(targetURL).then((res) => res.data);
  //       return data;
  //     } catch (err) {
  //       return err as Error;
  //     }
  //   }

  //   public static async getMultipleProducts(ids: Array<string>) {
  //     const targetURL = "products/";
  //     const combinedURL = host + targetURL;

  //     try {
  //       const fetchedData = await axios.all(
  //         ids.map((id: string) =>
  //           axios.get(combinedURL + id).then((res) => res.data)
  //         )
  //       );
  //       let formattedData: IFetchedData = {};
  //       fetchedData.forEach((item) => {
  //         console.log("FETCHED DATA MAP");
  //         console.log(item);

  //         formattedData[item.id] = item;
  //       });

  //       console.log(formattedData);
  //       return formattedData;
  //     } catch (err) {
  //       return err;
  //     }
  //   }
}
