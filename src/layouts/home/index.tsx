import * as React from "react";
import { WrapperComponent } from "src/ts/type/common";

interface Props extends WrapperComponent {}

const HomeLayout = (props: Props) => {
  return (
    <React.Fragment>
      {/* Aside bar */}
      {/* Main */}
      {props.children}
    </React.Fragment>
  );
};

export default HomeLayout;
