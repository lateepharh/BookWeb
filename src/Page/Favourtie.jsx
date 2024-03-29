import React from "react";
import { useContext } from "react";
import Favourite_context from "../componenet/store/favourite-context";
import { BookList } from "./HomePage";

function Favourtie() {
  const favouriteCxt = useContext(Favourite_context);
  let contents;
  // let day = new Date;
  // let exactDay = day.getDay()
  if (favouriteCxt.totalFavourite === 0) {
    contents = (
      <p>
        You have no favourite Books atm. Explore books and start adding some?
      </p>
    );
  } else {
    contents = <BookList book={favouriteCxt?.favourites} />;
    console.log("contents", contents);
  }
  return (
    <div>
      <h3>My Book Haven</h3>
      {contents}
    </div>
  );
}

export default Favourtie;
