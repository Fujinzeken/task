import React from "react";
import "../styles/card.css";
const Card = ({ item, data, setShowDetails, setClickedItem }) => {
  const { name, image } = item.normalized_metadata;
  const id = item.token_id;

  const handleClick = (id) => {
    const clickedItem = data.filter((item) => item.token_id === id);
    setClickedItem(clickedItem);
    setShowDetails(true);
  };
  return (
    <div className="product__item" onClick={() => handleClick(id)}>
      <div className="product__img">
        <img
          src={
            image ||
            "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
          }
          alt="product-img"
          className="w-50"
        />
      </div>
      <div className="product__content">
        <h5>{name}</h5>
      </div>
    </div>
  );
};

export default Card;
