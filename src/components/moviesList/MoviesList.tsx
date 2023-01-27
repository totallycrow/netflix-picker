import React from "react";
import { IMovie } from "../../types/moviesTypes";
import { CardItem } from "../movieCard/CardItem";

export const MoviesList = ({
  favList,
  callback,
  buttonText,
  favouriteSection,
}: {
  favList: Array<IMovie>;
  callback: (movieId: string) => void;
  buttonText: string;
  favouriteSection: boolean;
}) => {
  return (
    <div>
      {favList.map((movie: IMovie) => (
        <div key={movie.id}>
          <CardItem
            imagePath={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
            title={movie.title}
            buttonText={buttonText}
            id={movie.id}
            w={"2xl"}
            maxW={"2xl"}
            buttonCallback={() => callback(movie.id)}
            description={movie.overview.slice(0, 5000) + "..."}
            favouriteSection={true}
          />
        </div>
      ))}
    </div>
  );
};
