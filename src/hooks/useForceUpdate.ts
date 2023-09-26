import * as React from "react";

export const useForceUpdate = () => {
  const [, setToggle] = React.useState<boolean>(false);
  return () => setToggle((toggle) => !toggle);
};
