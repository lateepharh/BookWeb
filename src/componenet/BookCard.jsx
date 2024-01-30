import React from "react";
import Modal from "./modal";
function BookCard({ bookData }) {
  const [showdetails, setShowdetails] = React.useState(false);
  const [item, setItem] = React.useState();
  console.log(bookData);
  return (
    <section>
      {bookData.map((books) => {
        const thumbnail =
          books.volumeInfo.imageLinks &&
          books.volumeInfo.imageLinks.smallThumbnail;
        const description =
          //   books.volumeInfo.categories &&
          //   books.volumeInfo.categories[2];
          books.volumeInfo.description;

        return (
          <>
            <div
              className="card"
              key={books.id}
              onClick={() => {
                setShowdetails(true);
                setItem(books);
              }}
            >
              <img src={thumbnail} alt="" />
              <div className="title_bar">
                <h2>{books.volumeInfo.title}</h2>
              </div>
            </div>
            <Modal
              showdetails={showdetails}
              item={item}
              onClose={() => setShowdetails(false)}
            />
          </>
        );
      })}
    </section>
  );
}

export default BookCard;
