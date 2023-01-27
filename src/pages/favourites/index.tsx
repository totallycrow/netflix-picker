import { Center, Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import { MoviesList } from "../../components/moviesList/MoviesList";
import { useFavouritesList } from "../../hooks/useFavouritesList";
import FavouritesPreprocessor from "../../preprocessors/favouritesPreprocessor";
import { FavouritesPageProps } from "../../types/propsTypes";

export default function Favourites(props: FavouritesPageProps) {
  const { loginData } = props.sharedData;
  const { isAuth } = props.sharedData.loginData;
  const { favouriteMovies } = props.sectionBody;

  const { favList, removeFromFavList } = useFavouritesList(
    favouriteMovies,
    loginData
  );

  if (!isAuth)
    return (
      <Layout isAuth={false}>
        <div>Login In To See Your Favourite Movies</div>
      </Layout>
    );

  return (
    <Layout isAuth={isAuth}>
      <Container maxW="container.xl">
        <Center>
          <div>
            <h1>My Favourites</h1>
            <MoviesList
              favList={favList}
              callback={removeFromFavList}
              buttonText={"Remove From Favourites"}
              favouriteSection={true}
            />
          </div>
        </Center>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await FavouritesPreprocessor(context);
};
