import { Box, Grid } from "@mui/material";
import FooterAdmin from "src/components/footers/footerAdmin";
import AdminNavbar from "src/components/navbars/adminNavbar";
import Sidebar from "src/components/sidebar";
import AuthGuard from "src/screens/guard/authGuard";
import { WrapperComponent } from "src/ts/type/common";

interface Props extends WrapperComponent {}

export default function AdminLayout({ children }: Props) {
  return (
    <AuthGuard>
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <div className="relative bg-blueGray-100">
            <AdminNavbar />
            <Box className="md:px-10 px-4">{children}</Box>
            <FooterAdmin />
          </div>
        </Grid>
      </Grid>
    </AuthGuard>
  );
}
