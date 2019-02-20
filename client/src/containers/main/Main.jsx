import React from "react";

//redux
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

//router
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "components/privateRoute/PrivateRoute";
import indexRoutes from "routes/index.jsx";

const Main = ({ store, history }) => (
  <div>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            if (prop.private) {
              return (
                <PrivateRoute
                  exact={prop.exact}
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            } else {
              return (
                <Route
                  exact={prop.exact}
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            }
          })}
        </Switch>
      </ConnectedRouter>
    </Provider>
  </div>
);

export default Main;
