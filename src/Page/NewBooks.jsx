import React from "react";
import BookCard from "../componenet/BookCard";
import axios from "axios";

function NewBooks() {
  const [search, setSearch] = React.useState("");
  const [bookData, setBookData] = React.useState([]);
  const bookSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Clicked");
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyCitTSq1HjLjGutJd5a6b7rnDmiOP1o0gs" +
            "&maxResults=40"
        )
        .then((response) => setBookData(response.data.items))
        .catch((erro) => console.log(erro));
    }
  };
  return (
    <main>
      <div className="head">
        <div className="row"></div>
        <div className="row2">
          <h3>Explore your curiosity!!! Find your desired Books</h3>
          <div className="search">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={bookSearch}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
      <div className="cointainer">{<BookCard bookData={bookData} />}</div>
    </main>
  );
}

export default NewBooks;
