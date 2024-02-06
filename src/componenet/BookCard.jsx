import React from "react";
// import Modal from "(./modal";
import Popup from "reactjs-popup";
import "./styles.css";
function BookCard({ bookData }) {
  //   const [showdetails, setShowdetails] = React.useState(false);
  const [item, setItem] = React.useState(bookData);
  console.log(bookData);
  //   const items = bookData.map((eachItem) => {
  //     eachItem.id;
  //   });
  //   const url =
  //     "https://react-book-api-8049c-default-rtbd.firebaseio.com/books.json";
  const handleClick = (e, key) => {
    console.log(e.target);
    console.log("key index", key);
  };
  const submitBook = (clickeItem) => {
    fetch(
      "https://react-book-api-8049c-default-rtdb.firebaseio.com/books.json",
      {
        method: "POST",
        body: JSON.stringify(clickeItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("clickedd");
  };

  return (
    <section>
      {bookData.map((books, key) => {
        const Id = books.id;
        const thumbnail =
          books.volumeInfo.imageLinks &&
          books.volumeInfo.imageLinks.smallThumbnail;
        const description =
          //   books.volumeInfo.categories &&
          //   books.volumeInfo.categories[2];
          books.volumeInfo.description;

        return (
          <Popup
            key={Id}
            trigger={
              <div key={books.id}>
                <div
                  className="card"
                  key={key}
                  id={Id}
                  onClick={(e) => handleClick(e, key)}
                >
                  <img src={thumbnail} alt="" />
                  <div className="title_bar">
                    <h2>{books.volumeInfo.title}</h2>
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
                  <h3>{books.volumeInfo.title}</h3>
                  <h4>{books.volumeInfo.authors}</h4>
                  <button>
                    <a href={books.volumeInfo.previewLink}>more</a>
                  </button>
                </div>
              </div>
              <div className="description">{description}</div>
              <button onClick={() => submitBook(books)}>Add book</button>
            </div>
          </Popup>
        );
      })}
      {/* <Modal showdetails={showdetails} item={item} onClose={()=> setShowdetails(false)} /> */}
    </section>
  );
}

export default BookCard;
