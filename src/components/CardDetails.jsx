import React from "react";
import x from "../assets/x.svg";
import "../styles/cardDetails.css";
import { ToastContainer, toast } from "react-toastify";
const CardDetails = ({ clickedItem, setShowDetails }) => {
  let item = clickedItem[0];
  console.log(item);
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const checkIfLink = () => {
    if (item.normalized_metadata.external_link === null) {
      //   alert("Oopps, it seems theres something wrong with this link");
      toast.error("Ooopss, this link seems broken", toastOptions);
    }
  };
  return (
    <div className="modal__container">
      <div className="modal__wrapper">
        <div className="modal__top">
          <img onClick={() => setShowDetails(false)} src={x} alt="cancle.png" />
        </div>

        <div>
          <div>
            <img
              src={item.normalized_metadata.image || "Not Available"}
              alt="nft"
              className="w-50"
            />
          </div>
          <div>
            <h4>
              Name:
              <span>{item.normalized_metadata.name || "Not Available"}</span>
            </h4>
            <p>
              Description:
              <span>
                {item.normalized_metadata.description || "Not Available"}
              </span>
            </p>
            <p>
              Owner: <span>{item.owner_of || "Not Available"}</span>
            </p>
          </div>
        </div>
        <div>
          <a
            href={
              item.normalized_metadata.external_link !== null &&
              item.normalized_metadata.external_link
            }
            target="_blank"
            rel="noreferrer"
          >
            <button onClick={checkIfLink}>Buy Now!</button>
          </a>
        </div>
      </div>
      <ToastContainer className="toast" />
    </div>
  );
};

export default CardDetails;
