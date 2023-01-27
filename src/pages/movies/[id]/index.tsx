import { GetServerSideProps } from "next";
import moviesAPI, { IMovie } from "../../../services/tmdb/moviesAPI";
import { Center } from "@chakra-ui/react";
import useManageFavourites from "../../../hooks/useManageFavourites";
import Layout from "../../../components/layout/Layout";
import { generateErrorMovieObject } from "../../../services/tmdb/static";
import { MoviesList } from "../../../components/moviesList/moviesList";
import { IMovieProps } from "../../../types/propsTypes";
import moviepagePreprocessor from "../../../preprocessors/moviepagePreprocessor";

export default function MoviePage(props: IMovieProps) {
  const { movieData, isFavourite } = props.sectionBody;
  const { isAuth } = props.sharedData.loginData;
  const { setFavourite, buttonText } = useManageFavourites(
    isFavourite,
    props.sharedData.loginData,
    movieData
  );

  if (movieData.id === "ERROR_FETCHING_DATA")
    return (
      <div>
        <div>
          <div>Cannot find movie data</div>
        </div>
      </div>
    );

  return (
    <Layout isAuth={isAuth}>
      <div>
        <Center>
          <MoviesList
            favList={[movieData]}
            callback={setFavourite}
            buttonText={buttonText}
            favouriteSection={true}
          />
        </Center>
      </div>
    </Layout>
  );
}

// chakra-ui

export const getServerSideProps: GetServerSideProps = async (context) => {
  return moviepagePreprocessor(context);
};
