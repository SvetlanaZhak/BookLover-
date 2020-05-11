import * as firebase from "firebase";

export const rewriteFavouriteList = (newFavoritesList) => {
  const { currentUser } = firebase.auth();
  firebase
    .database()
    .ref(`users/${currentUser.uid}/favourites/`)
    .remove(() => {
      newFavoritesList.map((item) => saveFavouriteList(item));
    });
};

export const saveFavouriteList = (newFavoritesItem) => {
  const { currentUser } = firebase.auth();
  firebase
    .database()
    .ref(`users/${currentUser.uid}/favourites/`)
    .push(newFavoritesItem);
};
