import "./App.css";
import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Card from "./components/Card";
import CardDetails from "./components/CardDetails";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import loader from "./assets/loader.gif";
function App() {
  console.log(`${process.env.REACT_APP_VERY_PRIVATE_KEY}`);
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [clickedItem, setClickedItem] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const nftPerPage = 8;
  const visitedPage = pageNum * nftPerPage;

  const displayPage = data.slice(visitedPage, visitedPage + nftPerPage);
  const pageCount = Math.ceil(data.length / nftPerPage);

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const API =
    "4RwvLXeGPbS8ytY9e4fT972PsT1lQTsyJYvwGk7FcQJ2DMIAwro1qglc5hJobxZk";
  const handleSubmit = async () => {
    if (address === "" || address.length < 10) {
      toast.error("Invalid Address entered, please try again", toastOptions);
      return;
    }
    setLoading(true);
    try {
      await fetch(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal&limit=30&normalizeMetadata=true`,
        {
          headers: {
            "X-API-Key": API,
          },
        }
      )
        .then((res) => res.json())
        .then((result) => setData(result.result));
      setLoading(false);
      setAddress("");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, toastOptions);
    }
  };
  console.log(data);

  return (
    <>
      {loading ? (
        <div className="form__loader">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <>
          <Container className="App">
            <div>
              <input
                type="text"
                placeholder="enter wallet address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
            <Row>
              {data &&
                displayPage.map((item) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="6"
                    key={item.token_id}
                    className="mt-5"
                  >
                    <Card
                      item={item}
                      data={data}
                      setClickedItem={setClickedItem}
                      setShowDetails={setShowDetails}
                    />
                  </Col>
                ))}
            </Row>
            {data.length !== 0 && (
              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel="Prev"
                  nextLabel="Next"
                  containerClassName="paginationBtns"
                />
              </div>
            )}
            {showDetails && (
              <CardDetails
                clickedItem={clickedItem}
                setShowDetails={setShowDetails}
              />
            )}
          </Container>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
