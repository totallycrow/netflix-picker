// ************** TYPES & INTERFACES **************

import { ILoginData } from "./accountTypes";
import { IMovie } from "./moviesTypes";

export type IMainProps = {
  sharedData: {
    loginData: ILoginData;
  };
};

export interface HomePageProps extends IMainProps {
  sectionBody: {
    featuredMovies: IMovie[];
  };
}

export interface FavouritesPageProps extends IMainProps {
  sectionBody: {
    favouriteMovies: IMovie[];
  };
}

export interface IMovieProps {
  isFavourite: boolean;
  loginData: ILoginData;
  payload: IMovie;
}
