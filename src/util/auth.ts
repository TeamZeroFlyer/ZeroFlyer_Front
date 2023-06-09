import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

export const tokenLoader = () => {
  return getAuthToken();
};

// 로그인이 필요한 라우터에 loader로 추가해주세요.
export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
  return null;
};
