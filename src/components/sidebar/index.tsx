import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Link } from "react-router-dom";
import { sideBarMenu } from "src/routes";

const SideBar = () => {
  return (
    <>
      <Link
        className="text-blueGray-600  whitespace-nowrap text-sm uppercase font-bold p-4 px-0 flex justify-start align-center"
        to="/"
      >
        <FontAwesomeIcon className="mr-2 text-10" icon={faChartLine} />
        <Typography>MHK Tech</Typography>
      </Link>
      <Navigation
        activeItemId="/management/members"
        onSelect={() => {}}
        items={sideBarMenu}
      />
    </>
  );
};

export default SideBar;
