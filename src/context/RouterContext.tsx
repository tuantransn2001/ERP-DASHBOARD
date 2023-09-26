import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "src/screens/error";

import { IRoute } from "src/ts/type/common";

interface Props {
  routes: IRoute[];
}

const renderRoute = (route: IRoute[]) =>
  route.map(({ path, element }, index) => (
    <Route key={index} path={path} element={element} />
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
