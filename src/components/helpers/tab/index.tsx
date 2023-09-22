import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { WrapperComponent } from "src/ts/type/common";

interface CustomTabPanelProps extends WrapperComponent {
  index: number;
  value: number;
}
function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface MyTabsProps {
  data: {
    label: string;
    Component: React.ReactNode;
  }[];
}

export default function MyTabs({ data }: MyTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log({ event });
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map(({ label }, index) => (
            <Tab label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {data.map(({ Component }, index) => (
        <CustomTabPanel value={value} index={index}>
          {Component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
