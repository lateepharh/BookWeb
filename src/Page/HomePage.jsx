import React, { useState, useEffect, useContext } from "react";
import Slider from "../componenet/Slider";
// import Class from "./Page.module.css";
import axios from "axios";
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
  // const deleteBook = (id) => {
  //   fetch(
  //     `https://react-book-api-8049c-default-rtdb.firebaseio.com/books/${id}`,
  //     {
  //       method: "DELETE",
  //     }
  //   ).then((res) => {
  //     if (res.status === 200) {
  //       setLoadedbooks(
  //         loadedbooks.filter((book) => {
  //           return book.id !== id;
  //         })
  //       );
  //     } else {
  //       return;
  //     }
  //   });
  //   console.log(`Deleteing item with ID: ${id}`);
  // };
  const deleteBook = async (id) => {
    try {
      await axios.delete(
        `https://react-book-api-8049c-default-rtdb.firebaseio.com/books/${id}`
      );
      console.log(`Item ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
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
      <BookList book={loadedbooks} onDelete={deleteBook} />
    </main>
  );
}

export const BookList = ({ book, onDelete }) => {
  // const { book } = props;
  console.log(book);
  return (
    <section>
      {book.map((data) => {
        return (
          <Books key={data.key} {...data} id={data.id} onDelete={onDelete} />
        );
      })}
    </section>
  );
};

const Books = (props) => {
  const { onDelete } = props;
  const Id = props.id;
  const thumbnail =
    props.volumeInfo.imageLinks && props.volumeInfo.imageLinks.smallThumbnail;
  const title = props.volumeInfo.title;
  const downloadLink =
    props.accessInfo.pdf && props.accessInfo.pdf.downloadLink;

  const favorite_CTX = useContext(Favourite_context);
  const bookIsFavourite = favorite_CTX.favouriteBook(Id);
  // console.log("favorite", bookIsFavourite);
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
          <button onClick={() => onDelete(Id)}>Delee</button>
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
