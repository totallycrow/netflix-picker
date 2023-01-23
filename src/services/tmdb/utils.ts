export const generateSessionQuery = (token: string) => {
  const queryBody = {
    request_token: token,
  };

  const query = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  };

  return query;
};

export const generateFavouritesQuery = (
  movieId: string,
  isFavourite: boolean
) => {
  const queryBody = {
    media_type: "movie",
    media_id: movieId,
    favorite: isFavourite,
  };

  const query = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  };

  return query;
};
