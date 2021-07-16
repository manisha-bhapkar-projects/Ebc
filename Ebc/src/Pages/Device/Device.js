import React, { useState, useEffect } from "react";
import CardListTable from "../../Components/CardListTable/CardListTable";
import constants from "../../utils/constants";
import { Link, useHistory } from "react-router-dom";
import { callDeviceListApi } from "../../Action/DeviceAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Device = (props) => {
  const [deviceData, setDeviceData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setloading] = useState(false);
  const [isId, setId] = useState(1);
  const history = useHistory();

  useEffect(() => {
    getDeviceList(limit, skip, total);
  }, []);

  const getDeviceList = (limit, skip, total) => {
    setloading(true);
    props
      .callDeviceListApiAction(limit, skip, total)
      .then((res) => {
        setDeviceData(res.data.data);
        setLimit(res.data.limit);
        setTotal(res.data.total);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (skip) => {
    setSkip(skip);
    getDeviceList(limit, skip, total);
  };

  const DeviceColumn = [
    {
      name: "DEVICE ID",
      selector: "_id",
      right: false,
      grow: "5",
      cell: (row) => {
        return (
          <>
            <Link
              onClick={() => {
                history.push(`${constants.ROUTE.DEVICE.EDIT_DEVICE}${row._id}`);
              }}
            >
              {row._id}
            </Link>
          </>
        );
      },
    },
    {
      name: "DEVICE NAME",
      selector: "deviceName",
      grow: "4",
    },
    {
      name: "DEVICE TYPE",
      selector: "deviceType",
      grow: "4",
    },

    {
      name: "STATUS",
      selector: "status",
      grow: "2",
    },
    {
      name: "CAPACITY KVA",
      selector: "capacityKVA",
      grow: "3",
    },
    {
      name: "STORAGE KWH",
      selector: "storageKWH",
      grow: "3",
    },
  ];
  return (
    <div className="main-pg-content">
      <div className="title-page-content d-flex align-items-center justify-content-between mr-2">
        <h5>Device List</h5>
        <button
          className="btn  btn-icon-text mb-2 mb-md-0 custom-btn mr-3"
          onClick={() => {
            history.push(constants.ROUTE.DEVICE.ADD_DEVICE);
          }}
        >
          Add Device
        </button>
      </div>

      <div className="">
        <CardListTable
          columns={DeviceColumn}
          data={deviceData}
          pending={loading}
          pagination={false}
          custompagination
          paginationServer={false}
          noDataString={"No data found"}
          totalListCount={total}
          paginationTotalRows={total}
          paginationPerPage={limit}
          onPageChangedCalled={handlePageChange}
          inputClassName="mt-3"
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callDeviceListApiAction: callDeviceListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Device);
