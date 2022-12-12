import React, { Component, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CATEGORIES } from "./FetchData/DisplayData";
import Header from "./components/Header";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import PdpId from "./components/PdpId";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    const { data, loading, error } = useQuery(QUERY_ALL_CATEGORIES);
    return (
      <Component
        {...props}
        params={params}
        data={data}
        loading={loading}
        error={error}
      />
    );
  }
  return ComponentWithRouter;
}

const HOCPdpId = withRouter(PdpId);

class NewApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<Header />}>
          <Header />
          <Routes>
            <Route path="/Scandiweb/">
              <Route index element={<Category data={this.props.data} />} />
              <Route
                path="category/:category"
                element={<Category data={this.props.data} />}
              />
              <Route path="pdp/:id" element={<HOCPdpId />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to="/Scandiweb/" replace={true} />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

const HOCNewApp = withRouter(NewApp);

export default HOCNewApp;
