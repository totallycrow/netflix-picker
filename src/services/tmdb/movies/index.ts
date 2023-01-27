import { RequestError, RequestSuccess } from "../../../types/fetchingTypes";
import { IMovie } from "../../../types/moviesTypes";
import moviesAPI from "../moviesAPI";

export const getMovie = async (
  movieId: string
): Promise<RequestSuccess<IMovie> | RequestError> => {
  const data = await moviesAPI.fetcher<IMovie>({
    endpointType: "getMovie",
    movieId,
  });
  console.log(data);

  if (!data.success) {
    return data;
  }

  return {
    success: true,
    payload: data.payload,
  };
};

export const getPopularMovies = async (): Promise<
  RequestSuccess<IMovie[]> | RequestError
> => {
  const data = await moviesAPI.fetcher<any>({
    endpointType: "getPopularMovies",
  });
  console.log(data);

  if (!data.success) {
    return data;
  }

  return {
    success: true,
    payload: data.payload.results,
  };
};
