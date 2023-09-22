import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Box, Grid } from "@mui/material";
import AdminLayout from "src/layouts/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faUsers,
  faMapLocationDot,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

interface ISetting {
  icon: IconDefinition;
  title: string;
  description: string;
}

const settings: ISetting[] = [
  {
    icon: faMapLocationDot,
    title: "Cấu hình chi nhánh",
    description: "Thêm mới và quản lí chi nhánh",
  },
  {
    icon: faUsers,
    title: "Nhân viên và phân quyền",
    description: "Quản lí hân viên và phân quyền",
  },
  {
    icon: faMoneyBill,
    title: "Chính sách giá",
    description: "Tạo và quản lí chính sách giá cho cửa hàng",
  },
];

const SettingScreen = () => {
  return (
    <AdminLayout>
      <Grid container spacing={4}>
        {settings.map(({ icon, title, description }) => (
          <Grid item xs={3}>
            <Box sx={{ minWidth: 150, minHeight: 114 }}>
              <Card className="h-full" variant="outlined">
                <CardContent className="flex gap-2 h-full">
                  <FontAwesomeIcon className="mr-2 mt-1" icon={icon} />
                  <Box>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </AdminLayout>
  );
};
export default SettingScreen;
