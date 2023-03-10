// ************** TYPES & INTERFACES **************

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: string;
  vote_count: string;
}

export interface IFavouriteMoviesList {
  favouriteMoviesList: Array<IMovie>;
}

export interface IMoviesSuccess {
  page: string;
  results: IMovie[];
  total_pages: string;
  total_results: string;
}
