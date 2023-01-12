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
    try {
      const token = await axios
        .get(
          "https://api.themoviedb.org/3/authentication/token/new?api_key=0813f3326aa955f3707a6e8d13d652f7"
        )
        .then((response) => response.data);
      return token;
    } catch (err) {
      return err as Error;
    }
  }

  public static async getUserId(sessionId: string): Promise<IUserId | Error> {
    try {
      const userId = await axios
        .get(
          `https://api.themoviedb.org/3/account?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}`
        )
        .then((response) => response.data.id);
      return { userId: userId };
    } catch (err) {
      return err as Error;
    }
  }

  public static async getFavouriteMovies(
    userId: string,
    sessionId: string
  ): Promise<IFavouriteMoviesList | Error> {
    try {
      const movies = await axios
        .get(
          `https://api.themoviedb.org/3/account/${userId}/favorite/movies?api_key=0813f3326aa955f3707a6e8d13d652f7&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
        )
        .then((response) => response.data.results);
      return { favouriteMoviesList: movies };
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

  //   public static fetcher = (url: string) =>
  //     axios.get(url).then((res) => res.data);
}
