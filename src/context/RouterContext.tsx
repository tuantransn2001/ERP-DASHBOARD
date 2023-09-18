import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "src/screens/error";

import { IRoute } from "src/ts/type/common";

interface Props {
  routes: IRoute[];
}

const renderRoute = (route: IRoute[]) =>
  route.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ));

const RouterProvider = ({ routes }: Props) => {
  return (
    <Router>
      {
        <Routes>
          {renderRoute(routes)}
          <Route path="*" element={<Error errorCode={404} />} />
        </Routes>
      }
    </Router>
  );
};
export default RouterProvider;
