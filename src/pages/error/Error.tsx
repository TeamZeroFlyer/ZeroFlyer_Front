import { useEffect, useState } from "react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

import style from "./Error.module.css";
import logo from "../../../public/image/logo.svg";

const ErrorPage = () => {
  const error = useRouteError();
  const [errorObj, setErrorObj] = useState<{
    status: number;
    message: string;
  }>();
  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setErrorObj({
        status: error.status,
        message:
          error.status === 404
            ? "원하시는 페이지를 찾을 수 없습니다."
            : error.data.message,
      });
    }
  }, [errorObj]);

  return (
    <div className={style.errorPage}>
      <div>
        <img src={logo} alt="로고" className={style.logo} />
      </div>
      <div>
        <p className={style.status}>{errorObj?.status}</p>
        <p className={style.message}>{errorObj?.message}</p>
      </div>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default ErrorPage;
