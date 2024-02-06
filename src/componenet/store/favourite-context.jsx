import React from "react";
import { createContext, useState } from "react";

const Favourite_context = createContext({
  favourites: [],
  totalFavourite: 0,
  addBook: (favouritebook) => {},
  removeBook: (bookid) => {},
  favouriteBook: (bookid) => {},
});

export function FaavouriteContextProvider(props) {
  const [favourite, setFavourite] = useState([]);

  function removeFavourite(bookid) {
    setFavourite((previousFavourite) => {
      return previousFavourite.filter((book) => {
        return book.id !== bookid;
      });
    });
  }

  function addFavourite(favouritebook) {
    setFavourite((previousFavourite) => {
      return previousFavourite.concat(favouritebook);
    });
  }

  function FavouriteItem(bookid) {
    return favourite.some((book) => {
      return book.id === bookid;
    });
  }

  const contextValue = {
    addBook: addFavourite,
    removeBook: removeFavourite,
    favouriteBook: FavouriteItem,
  };

  return (
    <Favourite_context.Provider value={contextValue}>
      {props.children}
    </Favourite_context.Provider>
  );
}
export default Favourite_context;
