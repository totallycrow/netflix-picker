import { Container, Grid } from "@chakra-ui/react";
import React from "react";
import { IMovie } from "../../pages";
import { CardItem } from "../movieCard/CardItem";

export const MoviesGrid = ({
  moviesList,
  goToMovie,
}: {
  moviesList: Array<IMovie>;
  goToMovie: (movieId: string) => void;
}) => {
  return (
    <div>
      <Container maxW="container.xl">
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={6}
        >
          {moviesList.map((movie) => {
            return (
              <div key={movie.id}>
                <CardItem
                  imagePath={
                    "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                  }
                  title={movie.title}
                  buttonText={"See More"}
                  buttonCallback={() => goToMovie(movie.id)}
                  description={movie.overview.slice(0, 100) + "..."}
                  favouriteSection={true}
                  id={movie.id}
                />
              </div>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
