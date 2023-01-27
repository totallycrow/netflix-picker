import axios from "axios";
import {
  fetcherConfig,
  RequestError,
  RequestSuccess,
} from "../../../types/fetchingTypes";
import { generateUrl } from "./helpers";

export const fetch = async <T>(
  config: fetcherConfig
): Promise<RequestSuccess<T> | RequestError> => {
  const URL = generateUrl(config);
  console.log(config.endpointType);

  if (config.endpointType === "getUserId") {
    if (!config.sessionId)
      return {
        success: false,
        errorMessage: "Invalid parameter",
      };
  }
  if (config.endpointType === "getFavouriteMovies") {
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
};
