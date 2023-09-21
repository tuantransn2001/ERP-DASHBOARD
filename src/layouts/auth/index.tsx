// components

import Navbar from "src/components/navbars/authNavbar";
import img from "Assets/images/common/register_bg_2.png";
import FooterSmall from "src/components/footers/footerSmall";
import { WrapperComponent } from "src/ts/type/common";
import FireBaseProvider from "src/context/FireBaseContext";
// views
interface Props extends WrapperComponent {}
export default function AuthLayout({ children }: Props) {
  return (
    <FireBaseProvider>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + img + ")",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </FireBaseProvider>
  );
}
