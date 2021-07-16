import {
  BrowserRouter as Router,
  Switch, Redirect
} from "react-router-dom";
import PublicRoute from "./utils/routes/PublicRoute/PublicRoute";
import PrivateRoute from "./utils/routes/PrivateRoute/PrivateRoute";
import constants from "./utils/constants";
import Login from "./Pages/Login/Login";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Registration from "./Pages/Login/Registration";
import Layout from "./Components/Layout/Layout";
import { sidebar, approver_sidebar } from "./utils/routes";
import AddNewDevice from "./Pages/Device/AddNewDevice";
import EditDevice from "./Pages/Device/EditDevice";
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/style.css';
import EditOffer from "./Pages/Offers/EditOffer";
import AddOffers from "./Pages/Offers/AddOffers";
import AddBids from "./Pages/Bids/AddBids";
import EditBids from "./Pages/Bids/EditBids";
import { getAccountData } from "./utils/storage/index";
import { useEffect } from "react";

function App() {
  var accountData = getAccountData();
  
  return (
    <div className="main-wrapper">
      <NotificationContainer />
      <Router>
        <Switch>
          <PublicRoute
            exact
            path={constants.ROUTE.LOGIN.LOGIN}
            component={Login} />
          <PublicRoute
            exact
            path={constants.ROUTE.LOGIN.REGISTRATION}
            component={Registration}
          />
          <Switch>
            <Layout>
              <Switch>
                {sidebar.map((item, index) => {
                  return (
                    <PrivateRoute
                      key={index}
                      path={item.path}
                      exact
                      component={item.component}
                    />
                  )
                })}

                <PrivateRoute
                  exact
                  path={constants.ROUTE.DEVICE.ADD_DEVICE}
                  component={AddNewDevice}
                />
                  <PrivateRoute
                  exact
                  path={constants.ROUTE.DEVICE.EDIT_DEVICE_BY_ID}
                  component={EditDevice}
                />
                  <PrivateRoute
                  exact
                  path={constants.ROUTE.OFFERS.ADD_OFFERS}
                  component={AddOffers}
                />
                   <PrivateRoute
                  exact
                  path={constants.ROUTE.OFFERS.EDIT_OFFERS_BY_ID}
                  component={EditOffer}
                />

                <PrivateRoute
                  exact
                  path={constants.ROUTE.BIDS.ADD_BIDS}
                  component={AddBids}
                />
                   <PrivateRoute
                  exact
                  path={constants.ROUTE.BIDS.EDIT_BIDS_BY_ID}
                  component={EditBids}
                />

                   {accountData && accountData.isAdmin === true ?
                     approver_sidebar.map((item, index) => {
                      return (
                        <PrivateRoute
                          key={index}
                        />
                      )
                    }): null}
             
                <Redirect to={constants.ROUTE.LOGIN.LOGIN} />
              </Switch>
            </Layout>
            <Redirect to={constants.ROUTE.LOGIN.LOGIN} />
          </Switch>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
