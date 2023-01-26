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
