import { useNavigate, json } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import style from "./QrDropdown.module.css";

const Dropdown: React.FC<{
  qrId: number;
}> = (props) => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const onEditHandler = () => {
    navigate(`/qr/${props.qrId}/edit`);
  };
  const onDeleteHandler = async () => {
    const response = await fetch(
      `https://qrecode-back.shop/qr/delete?idx=${props.qrId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer " + ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw json({ message: "QR 삭제에 실패했습니다." }, { status: 500 });
    }
  };

  return (
    <ul className={style.dropdown}>
      <li className={style.li} onClick={onEditHandler}>수정</li>
      <li className={style.li} onClick={onDeleteHandler}>삭제</li>
    </ul>
  );
};

export default Dropdown;
