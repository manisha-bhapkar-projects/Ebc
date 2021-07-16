import React, { useState, useEffect } from "react";
import Offers from "../Offers/Offers";
import Bids from "../Bids/Bids";
import Trade from "../Trade/Trade";
const TradeMenu = (props) => {
  const [isPanel1, setIsPanel1] = useState(1);
  const [isPanel2, setIsPanel2] = useState(1);
  const [isFlag, setIsFlag] = useState(false);
  const [id, setId] = useState("");
  const [isBidListFlag, setBidListFlag] = useState(false);
  const [isOfferListFlag, setOfferListFlag] = useState(false);

  useEffect(() => {
    if (isPanel1 || isPanel2 === 1) {
      setBidListFlag(true);
    }

    if (isPanel1 || isPanel2 === 2) {
      setOfferListFlag(true);
    } else {
      setOfferListFlag(false);
      setBidListFlag(false);
    }
  }, []);

  const handleClickPanel1 = (id) => {
    setIsPanel1(id);
  };

  const handleClickPanel2 = (id) => {
    setIsPanel2(id);
  };

  return (
    <div className="main-pg-content mt-0">
      <div>
        <div className="custome-button">
          <button
            className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 mr-3 ${
              isPanel1 === 1 ? "active-btn" : ""
            }`}
            onClick={() => handleClickPanel1(1)}
          >
            Bids
          </button>
          <button
            className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 mr-3 ${
              isPanel1 === 2 ? "active-btn" : ""
            }`}
            onClick={() => handleClickPanel1(2)}
          >
            Offers
          </button>

          <button
            className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 mr-3 ${
              isPanel1 === 3 || props.isFlag ? "active-btn" : ""
            }`}
            onClick={() => handleClickPanel1(3)}
          >
            Trade
          </button>
          {/* <button
            className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 ml-3 ${
              isPanel1 === 4 ? "active-btn" : ""
            }`}
            onClick={() => handleClickPanel1(4)}
          > */}
          {/* <div  
           className={` ${
            isPanel1 === 4 ? "active" : ""
          }`}
          onClick={() => handleClickPanel1(4)}
          >
            <CustomeDropDown
              className="dropdown_custom_trade"
              // className={`dropdown_custom_trade ${
              //   isPanel1 === 4 ? "active" : ""
              // }`}
              data={charts_option}
              placeholder="List"
              value={chart_data(id)}
              onSelect={(e) => {
                updateDropdown(e);
              }}
              // onClick={() => handleClickPanel1(4)}
            />
            </div> */}
          {/* </button> */}
        </div>
      </div>

      <div className="row trademenurow">
        <div className="col-md-6">
          <div className="">
            {isPanel1 === 1 ? (
              <Bids
                isBidListFlag={isBidListFlag}
                changePage={() => handleClickPanel1(3)}
              />
            ) : isPanel1 === 2 ? (
              <Offers
                isOfferListFlag={isOfferListFlag}
                changePage={() => handleClickPanel1(3)}
              />
            ) : isPanel1 === 3 ? (
              <Trade isFlag={isFlag} />
            ) : ""
            // : isPanel1 === 4 && id == 1 ? (
            //   <Charts />
            // ) : (
            //   <Trade isFlag={isFlag} />
            // )
            }
          </div>
        </div>

        <div className="col-md-6 tradmenu-new">
          <div className="custome-button cutom-trade-second-nav">
            <button
              className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 mr-3 ${
                isPanel2 === 1 ? "active-btn" : ""
              }`}
              onClick={() => handleClickPanel2(1)}
            >
              Bids
            </button>
            <button
              className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 mr-3 ${
                isPanel2 === 2 ? "active-btn" : ""
              }`}
              onClick={() => handleClickPanel2(2)}
            >
              Offers
            </button>

            <button
              className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 ${
                isPanel2 === 3 || props.isFlag ? "active-btn" : ""
              }`}
              onClick={() => handleClickPanel2(3)}
            >
              Trade
            </button>
            {/* <button
              className={`btn btn-icon-text mb-2 mb-md-0 custom-btn1 ml-3 ${
                isPanel1 === 4 ? "active-btn" : ""
              }`}
              // onClick={() => handleClickPanel1(4)}
            >
              <CustomeDropDown
                // className="dropdown_custom"
                data={charts_option}
                placeholder="List"
                value={chart_data(id)}
                onSelect={(e) => {
                  updateDropdown(e);
                }}
              />
            </button> */}
          </div>
          <div className="">
            {isPanel2 === 1 ? (
              <Bids
                isBidListFlag={isBidListFlag}
                changePage={() => handleClickPanel2(3)}
              />
            ) : isPanel2 === 2 ? (
              <Offers
                isOfferListFlag={isOfferListFlag}
                changePage={() => handleClickPanel2(3)}
              />
            ) : isPanel2 === 3 ? (
              <Trade isFlag={isFlag} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeMenu;
