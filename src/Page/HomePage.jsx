import React, { useState, useEffect, useContext } from "react";
import Slider from "../componenet/Slider";
import Class from "./Page.module.css";
import { Link } from "react-router-dom";
import Favourite_context from "../componenet/store/favourite-context";
function HomePage() {
  const [isLoading, setIsloading] = useState(true);
  const [loadedbooks, setLoadedbooks] = useState([]);

  useEffect(() => {
    setIsloading(true);
    fetch("https://react-book-api-8049c-default-rtdb.firebaseio.com/books.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const books = [];
        for (const key in data) {
          const item = {
            id: key,
            ...data[key],
          };

          books.push(item);
        }
        //this setIsLoading state is false because we arent loading anymore

        setIsloading(false);
        setLoadedbooks(books);
        console.log(books);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading.......</p>
      </section>
    );
  }
  return (
    <main>
      <Slider />
      <h3>All Books</h3>
      {!loadedbooks.length && (
        <Link to="/books">Click here to see and find books</Link>
      )}
      <BookList book={loadedbooks} />
    </main>
  );
}

export const BookList = (props) => {
  // const { book } = props;
  console.log(props.book);
  return (
    <section>
      {props.book.map((data) => {
        return <Books key={data.key} {...data} id={data.id} />;
      })}
    </section>
  );
};

const Books = (props) => {
  const [book, setBook] = useState([]);
  const deleteBook = async (id) => {
    await fetch(
      `https://react-book-api-8049c-default-rtdb.firebaseio.com/books/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.status === 200) {
        setBook(
          book.filter((book) => {
            return book.id !== id;
          })
        );
      } else {
        return;
      }
    });
    console.log("Delete");
  };
  const Id = props.id;
  const thumbnail =
    props.volumeInfo.imageLinks && props.volumeInfo.imageLinks.smallThumbnail;
  const title = props.volumeInfo.title;
  const downloadLink =
    props.accessInfo.pdf && props.accessInfo.pdf.downloadLink;

  const favorite_CTX = useContext(Favourite_context);
  const bookIsFavourite = favorite_CTX.favouriteBook(Id);
  console.log("favorite", bookIsFavourite);
  function toggleFavouriteHandler() {
    if (bookIsFavourite) {
      favorite_CTX.removeBook(Id);
    } else {
      favorite_CTX.addBook({
        id: props.id,
        thumbnail: thumbnail,
        title: title,
      });
    }
    // console.log("Favourite");
  }
  // const handleDownload = ()=>{}
  return (
    <>
      <div className="wrapper" key={props.id} id={Id}>
        <div className="card_book" key={Id}>
          <img src={thumbnail} alt="" />
          <h3>{title}</h3>
        </div>
        <div className="actions">
          <button onClick={() => deleteBook(Id)}>Delete</button>
          <button className="actions-btn">
            <a href={downloadLink}>Click here to download pdf</a>
          </button>
          <button className="actions-btn" onClick={toggleFavouriteHandler}>
            {bookIsFavourite ? "Remove from Favourite" : "Add to favourite"}
          </button>
        </div>
      </div>
    </>
  );
};
export default HomePage;
