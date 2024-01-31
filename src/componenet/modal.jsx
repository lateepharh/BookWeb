import React from "react";
import "./styles.css";
import axios from "axios";

function Modal({ showdetails, item, onClose }) {
  const url =
    "https://react-book-api-8049c-default-rtbd.firebaseio.com/books.json";
  const submitBook = (item) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // try {
    //   const response = await axios.post(url, { item });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error.response);
    // }
  };

  if (!showdetails) {
    return null;
  }

  const thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  const description =
    //   item.volumeInfo.categories &&
    //   books.volumeInfo.categories[2];
    item.volumeInfo.description;

  return (
    <section className="overlay">
      <div className="overlay-inner">
        <button className="close" onClick={onClose}>
          Close
        </button>
        <div className="inner-box">
          <img src={thumbnail} alt="" />
          <div className="information">
            <h3>{item.volumeInfo.title}</h3>
            <h4>{item.volumeInfo.authors}</h4>
            <button>
              <a href={item.volumeInfo.previewLink}>more</a>
            </button>
          </div>
        </div>
        <div className="description">{description}</div>
        <button onClick={submitBook}>Add book</button>
      </div>
    </section>
  );
}

export default Modal;
