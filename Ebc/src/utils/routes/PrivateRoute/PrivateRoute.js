import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLogin, scrollToTop } from '../../utils';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  useEffect(() => {
    scrollToTop();
  }, [history.location.pathname]);

  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
  ]).isRequired,
};

export default connect(null, null)(PrivateRoute);














// import React, { useEffect } from 'react';
// import { Route, Redirect, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { isLogin, scrollToTop } from '../../utils';
// import constants from '../../constants';

// // eslint-disable-next-line react/prop-types
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const history = useHistory();
//   useEffect(() => {
//     scrollToTop();
//   }, [history.location.pathname]);

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isLogin() ? <Component {...props} /> : <Redirect to='/' />
//       }
//     />
//   );
// };

// PrivateRoute.propTypes = {
//   component: PropTypes.oneOfType([
//     PropTypes.instanceOf(Array),
//     PropTypes.instanceOf(Object),
//   ]).isRequired,
// };

// export default connect(null, null)(PrivateRoute);

