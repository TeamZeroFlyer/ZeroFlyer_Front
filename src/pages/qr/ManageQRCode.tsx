import { Link } from "react-router-dom";

import QRList from "../../components/qr/QRList";
import style from "./ManageQRCode.module.css";
import Button from "../../UI/Button";
import Header from "../../components/footer/Header";

const ManageQRCode = () => {
  return (
    <>
      <Header>QR코드 관리</Header>
      <div className={style.contentsHeader}>
        <h3>QR 목록</h3>
        <Link to="/qr/new">
          <Button>QR 만들기</Button>
        </Link>
      </div>
      <hr />
      <div className={style.contents}>
        <ul className={style.ul}>
          <p>6월 3일(토)</p>
          <li className={style.item}>
            <Link to={"1"}>
              <QRList />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ManageQRCode;
