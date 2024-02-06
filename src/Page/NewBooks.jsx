import React, { useContext } from "react";
// import BookCard from "../componenet/BookCard";
import axios from "axios";
import Popup from "reactjs-popup";
import "../componenet/styles.css";
import "./Style.css";

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
            "&filter=full" +
            "&key=AIzaSyCitTSq1HjLjGutJd5a6b7rnDmiOP1o0gs" +
            "&maxResults=40"
        )
        .then((response) => {
          setBookData(response.data.items);
          console.log(response.data.items);
        })
        .catch((erro) => console.log(erro));
    }
  };
  const handleClick = (e, key) => {
    console.log(e.target);
    console.log("key index", key);
  };
  const submitBook = (clickedItem) => {
    fetch(
      "https://react-book-api-8049c-default-rtdb.firebaseio.com/books.json",
      {
        method: "POST",
        body: JSON.stringify(clickedItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("clickedd");
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
      {/* <div className="cointainer">{<BookCard bookData={bookData} />}</div> */}
      {/* <div className="container"> */}
      {bookData.map((book) => {
        const Id = book.id;
        const thumbnail =
          book.volumeInfo.imageLinks &&
          book.volumeInfo.imageLinks.smallThumbnail;
        const description = book.volumeInfo.description;
        return (
          <Popup
            key={Id}
            trigger={
              <div key={book.id}>
                <div
                  className="card"
                  key={Id}
                  id={Id}
                  onClick={(e) => handleClick(e)}
                >
                  <img src={thumbnail} alt="" />
                  <div className="title_bar">
                    <h2>{book.volumeInfo.title}</h2>
                  </div>
                </div>
              </div>
            }
            modal
            on="click"
            mouseEnterDelay={0}
            mouseLeaveDelay={300}
          >
            <div className="overlay-inner">
              <button className="close">Close</button>
              <div className="inner-box">
                <img src={thumbnail} alt="" />
                <div className="information">
                  <h3>{book.volumeInfo.title}</h3>
                  <h4>{book.volumeInfo.authors}</h4>
                  <button>
                    <a href={book.volumeInfo.previewLink}>more</a>
                  </button>
                </div>
              </div>
              <div className="description">{description}</div>
              <button onClick={() => submitBook(book)}>Add book</button>
            </div>
          </Popup>
        );
      })}
      {/* </div> */}
    </main>
  );
}

export default NewBooks;
