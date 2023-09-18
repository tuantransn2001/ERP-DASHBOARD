import backgroundNoPermission from "./svg/NoPermission.svg";
import backgroundMaintenance from "./svg/Maintenance.svg";
import backgroundComingSoon from "./svg/ComingSoon.svg";
import background404 from "./svg/404.svg";
import background500 from "./svg/500.svg";

import { Helmet } from "react-helmet";
import * as React from "react";
import "./styles/index.css";
interface Props {
  errorCode: number;
}

const ErrorScreen = ({ errorCode }: Props) => {
  const [dataError, setDataError] = React.useState({
    title: "",
    text: "",
    image: "",
    width: "",
  });

  React.useEffect(() => {
    if (errorCode === 500) {
      setDataError({
        title: "LỖI YÊU CẦU MÁY CHỦ",
        text: "Đã xảy ra lỗi khi kết nối tới máy chủ, vui lòng liên hệ với quản trị viên Website để biết thêm thông tin",
        image: background500,
        width: "60%",
      });
    } else if (errorCode === 404) {
      setDataError({
        title: "KHÔNG TÌM THẤY TRANG",
        text: "Trang bạn đang truy cập không tồn tại hoặc đã được chuyển sang trang mới vĩnh viễn",
        image: background404,
        width: "60%",
      });
    } else if (errorCode === 406) {
      setDataError({
        title: "TRUY CẬP BỊ HẠN CHẾ",
        text: "Bạn không có quyền truy cập trang này, vui lòng liên hệ quản trị viên Website để biết thêm thông tin",
        image: backgroundNoPermission,
        width: "65%",
      });
    } else if (errorCode === 503) {
      setDataError({
        title: "BẢO TRÌ HỆ THỐNG",
        text: "Trang bạn đang truy cập đang được sửa chữa và nâng cấp, vui lòng quay lại sau",
        image: backgroundMaintenance,
        width: "65%",
      });
    } else if (errorCode === 501) {
      setDataError({
        title: "TÍNH NĂNG ĐANG ĐƯỢC XÂY DỰNG",
        text: "Chúng tôi sẽ thông báo đến bạn ngay khi tính năng được ra mắt trên hệ thống",
        image: backgroundComingSoon,
        width: "65%",
      });
    }
  }, [errorCode]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{dataError.title}</title>
      </Helmet>

      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404"></div>
          <h1>{errorCode}</h1>
          <h2>Oops! {dataError.title}</h2>
          <p>{dataError.text}</p>
          <a href="/">Back to homepage</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorScreen;
