export const generateQuery = (token: string) => {
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
