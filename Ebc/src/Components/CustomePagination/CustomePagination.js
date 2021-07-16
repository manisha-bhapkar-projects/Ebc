import React, { useState, useEffect } from "react";
import "./CustomePagination.css";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";


function CustomePagination({ totalLength, onPageChangedCalled, limit, loading, propPageNo}) {
  const [pageNo, setPageNo] = useState(1);
  const countTotalPage = totalLength / limit;

  useEffect(() => {
   console.log("propPageNo",propPageNo);
   console.log("loading",loading);

      setPageNo(1);
  }, [totalLength]);


  const TotalPages = Math.ceil(countTotalPage);
  const NextPage = () => {
    if (TotalPages !== pageNo) {
      window.scrollTo(0, 0);
      const page = pageNo + 1;
      setPageNo(page);
      onPageChangedCalled(page);
    }
  };
  const PreviousPage = () => {
    if (pageNo !== 1) {
      window.scrollTo(0, 0);
      const page = pageNo - 1;
      setPageNo(page);
      onPageChangedCalled(page);
    }
  };

  const getPageNumbers = (totalPages) => {
    const arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    return arr;

  };

  const selectPageNumber = (_pageNo) => {
    console.log("selectPageNumber",_pageNo);
    window.scrollTo(0, 0);
    setPageNo(_pageNo);
    onPageChangedCalled(_pageNo);
    // if (_pageNo != pageNo && loading === true) {
    //   setPageNo(1)
    //   // onPageChangedCalled(_pageNo);

    // }
  
  };


  return (
    <div className="custome-pagination">
      <div className="pagination pagination-home pagination-section">
     
         {TotalPages === pageNo ?
           <p>Showing  {((pageNo * limit) + 1) - limit} to  {totalLength} of {totalLength} entries</p> :
           <p>Showing {((pageNo * limit) + 1) - limit} to {pageNo * limit} of {totalLength} entries</p>
         }

        <ul className="pagination pagination-home pagination-section">
          <div className="d-flex">
            <li
              className={`paginate_button page-item previous ${
                pageNo === 1 ? "disabled" : ""
                }`}
                
            >
              <div
                className="pagination-number page-link "
                onKeyDown={PreviousPage}
                onClick={PreviousPage}
                tabIndex="0"
                role="button"
              >
                <a>Prev</a>
              </div>
            </li>

            {getPageNumbers(TotalPages).map((_page) => {
              // console.log("getPageNumbers",_page);
              if (
                (_page >= pageNo - 1 && _page <= pageNo + 1) ||
                _page === TotalPages ||
                _page === 1 ||
                _page != pageNo &&  loading === true
              ) {
                if (_page === pageNo) {
                console.log("_page and pageNo",_page, pageNo);

                  return (
                    <li className="active">
                      <div className="pagination-number page-item">{_page}</div>
                    </li>
                  );
                }

                // if (_page === pageNo || _page !== pageNo && loading === true) {
                //   console.log("_page and pageNo",_page, pageNo);
  
                //     return (
                //       <li className="active">
                //         <div className="pagination-number page-item">{_page}</div>
                //       </li>
                //     );
                //   }

            //  else if (_page !== pageNo && loading === true) {
            //         return (
            //           <li className="active">
            //             <div className="pagination-number page-item">{_page}</div>
            //           </li>
            //         );
            //       }

                return (
                  <li
                    className=""
                    onClick={() => {
                      selectPageNumber(_page);
                    }}
                    onKeyDown={() => {
                      selectPageNumber(_page);
                    }}
                    tabIndex="0"
                    role="button"
                  >
                    
                    <div className="pagination-number">{_page}</div>
                  </li>
                );
              }
              if (_page > pageNo - 4 && _page < pageNo + 4) {
                console.log("._page",_page, pageNo-4, pageNo+4);
                return <div className="pagination-dot">.</div>;
              }


              // if (loading === true) {
              //   <div className="pagination-number">{_page}</div>
              // }
              return <></>;
            
            })}

            <li
              className={`paginate_button page-item next ${
                getPageNumbers(TotalPages).length === pageNo ? "disabled" : ""
                }`}
            >
              <div
                className="pagination-number page-link"
                onKeyDown={NextPage}
                onClick={NextPage}
                tabIndex="0"
                role="button"
              >
                <a>Next</a>
              </div>
            </li>
          </div>
        </ul>
      </div>

    </div>
  );
}

CustomePagination.propTypes = {
  totalLength: PropTypes.number.isRequired,
  onPageChangedCalled: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(CustomePagination);







