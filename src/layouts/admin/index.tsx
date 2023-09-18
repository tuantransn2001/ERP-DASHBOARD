import FooterAdmin from "src/components/footers/footerAdmin";
import HeaderStatus from "src/components/headers";
import AdminNavbar from "src/components/navbars/adminNavbar";
import Sidebar from "src/components/sidebar";
import { WrapperComponent } from "src/ts/type/common";

interface Props extends WrapperComponent {}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStatus />
        {children}
        <FooterAdmin />
      </div>
    </>
  );
}
