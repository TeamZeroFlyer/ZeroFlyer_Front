import { Link } from "react-router-dom";

import QRList from "../components/QRList";
import style from "./ManageQRCode.module.css";
import Button from "../ui/Button";
const ManageQRCode = () => {
  return (
    <div className={style.container}>
      <div className={style.titleBox}>
        <h2>QR코드 관리</h2>
      </div>
      <div className={style.contentsHeader}>
        <p style={{ fontWeight: "bold" }}>QR 목록</p>
        <Link to="/qr/new">
          <Button>QR 만들기</Button>
        </Link>
      </div>
      <div>
        <ul style={{ padding: "1rem" }}>
          <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            6월 3일(토)
          </p>
          <li>
            <Link to={"1"}>
              <QRList />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManageQRCode;
