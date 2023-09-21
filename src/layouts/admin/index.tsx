import { Grid } from "@mui/material";
import FooterAdmin from "src/components/footers/footerAdmin";
import AdminNavbar from "src/components/navbars/adminNavbar";
import Sidebar from "src/components/sidebar";
import { WrapperComponent } from "src/ts/type/common";

interface Props extends WrapperComponent {}

export default function AdminLayout({ children }: Props) {
  return (
    <Grid>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={8}>
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {children}
          <FooterAdmin />
        </div>
      </Grid>
    </Grid>
  );
}
