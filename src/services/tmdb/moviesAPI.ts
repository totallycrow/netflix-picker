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
