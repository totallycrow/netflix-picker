import { GetServerSideProps } from "next";

import Layout from "../components/layout/Layout";
import { useButtonHandler } from "../hooks/useButtonHandler";
import { MoviesGrid } from "../components/moviesGrid/MoviesGrid";
import homepagePreprocessor from "../preprocessors/homepagePreprocessor";
import { HomePageProps } from "../types/propsTypes";

export default function Home(props: HomePageProps) {
  const { goToMovie } = useButtonHandler();
  const { isAuth } = props.sharedData.loginData;
  const moviesList = props.sectionBody.featuredMovies;

  if (moviesList.length === 0) return <div>No Movies To Display</div>;

  return (
    <Layout isAuth={isAuth}>
      <MoviesGrid moviesList={moviesList} goToMovie={goToMovie}></MoviesGrid>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  // does it need await?
  return await homepagePreprocessor(context);
};
