/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASE_URL, options } from "@/config";
import { movieDetailReducer, movieReducer, setFavourites, setLocalFav, topBosListReducer, topRatedListReducer, upComingMovieReducer } from "../reducers/homeReducer";
import { AppDispatch } from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const movieListAction = () => (dispatch: AppDispatch) => {
  fetch(`${BASE_URL}/most-popular-movies`, options)
    .then(response => response.json())
    .then(response => dispatch(movieReducer(response)))
    .catch(err => console.error(err));
}


export const topBoxListAction = () => (dispatch: AppDispatch) => {
  fetch(`${BASE_URL}/top-box-office`, options)
    .then(response => response.json())
    .then(response => dispatch(topBosListReducer(response)))
    .catch(err => console.error(err));
}

export const topRatedEnglishMovie = () => (dispatch: AppDispatch) => {
  fetch(`${BASE_URL}/top-rated-english-movies`, options)
    .then(response => response.json())
    .then(response => dispatch(topRatedListReducer(response)))
    .catch(err => console.error(err));
}

export const movieDetailAction = (id: string) => (dispatch: AppDispatch) => {
  if (!id || id === "0") {
    console.error("Invalid movie ID:", id);
    return;
  }
  fetch(`${BASE_URL}/${id}`, options)
    .then(response => response.json())
    .then(response => dispatch(movieDetailReducer(response)))
    .catch(err => console.error(err));
}


export const upComingMovieAction = () => (dispatch: AppDispatch) => {
  fetch(`${BASE_URL}/upcoming-releases?countryCode=US&type=MOVIE`, options)
    .then(response => response.json())
    .then(response => dispatch(upComingMovieReducer(response)))
    .catch(err => console.error(err));
}


export const addToFavouritesAction = (movie: any) => (dispatch: AppDispatch) => {
  dispatch(setFavourites(movie));
};

export const loadFavourites = () => async (dispatch: AppDispatch) => {
  try {
    const favs = await AsyncStorage.getItem('favourites') ?? null
    if (favs) {
      try {
        const parsedFavs = JSON.parse(favs);
        dispatch(setLocalFav(parsedFavs));
      } catch (e) {
        console.error('JSON parse error in homeActions.tsx (favs):', e, favs);
        await AsyncStorage.removeItem('favourites');
        dispatch(setLocalFav([]));
      }
    }
  } catch (error) {
    console.error('Error loading favourites:', error);
  }
};