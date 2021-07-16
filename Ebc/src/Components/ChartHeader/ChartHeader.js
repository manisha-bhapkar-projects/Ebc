import React from "react";
import { chart_title } from "../staticDropdownData";

const ChartHeader = ({ title, price }) => {
  return (
    <div className="row  chart-header">
      {title === true
        ? chart_title.map((item, index) => (
            <div className="col">
              <small>
                <b className="chart-title">{item.title}</b>
              </small>
              <br />
              {price ? <small>{price}</small> : ""}
            </div>
          ))
        : ""}
    </div>
  );
};

export default ChartHeader;
