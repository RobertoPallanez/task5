import React from "react";
import "./App.css";
import { useState } from "react";

function ItemRow(props) {
  const [showData, setShowData] = useState(false);

  const displayMode = {
    display: showData ? "grid" : "none",
  };

  const background = {
    backgroundColor: showData ? "lightBlue" : null,
  };

  const rotateIcon = {
    transform: showData ? "rotate(180deg)" : null,
  };

  function handleBookData() {
    setShowData(!showData);
  }

  return (
    <div className="itemFullRow">
      <div className="itemRowBox" onClick={handleBookData} style={background}>
        <div className="expandIcon" style={background}>
          <img
            className="expandArrowIcon"
            src="./expandArrowIcon.svg"
            style={rotateIcon}
          />
        </div>
        <div className="itemNumber" style={background}>
          {props.number}
        </div>
        <div className="headerItemRow" style={background}>
          {props.isbn}
        </div>
        <div className="headerItemRow" style={background}>
          {props.title}
        </div>
        <div className="headerItemRow" style={background}>
          {props.author}
        </div>
        <div className="headerItemRow" style={background}>
          {props.publisher}, {props.publicationDate}
        </div>
      </div>
      <div className="bookData" style={displayMode}>
        <div className="coverAndScore">
          <div
            className="bookCover"
            style={{ backgroundImage: `url(${props.cover})` }}
          >
            <div className="authorOnCover">{props.author}</div>
            <div className="titleOnCover">{props.title}</div>
          </div>
          <div className="bookScore">
            {props.likes}
            <img className="likeIcon" src="./likeIcon2.svg" />
          </div>
        </div>
        <div className="dataAndReviews">
          <div className="bookName">{props.title}</div>
          <div className="authors">{props.author}</div>
          <div className="publisher">
            {props.publisher}, {props.publicationDate}
          </div>
          <div className="reviewHeader">Reviews</div>
          {props.reviews.map((review, idx) => (
            <>
              <div className="reviewText" key={idx}>
                {review.reviewText}
              </div>
              <div className="reviewAuthor">{review.reviewAuthor}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemRow;
