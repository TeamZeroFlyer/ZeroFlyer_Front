import PointList from "../components/point/PointList";

export type History = {
  store: string;
  date: Date;
  point: {
    operator: string;
    value: number;
  };
};

export type PointHistory = {
  scan: number;
  totalPoint: number;
  histories: History[];
};

const dummy: PointHistory = {
  scan: 127,
  totalPoint: 3600,
  histories: [
    {
      store: "새싹 미용실",
      date: new Date("2023-06-02T12:29"),
      point: { operator: "+", value: 10 },
    },
    {
      store: "새싹 헬스장",
      date: new Date("2023-06-02T12:13"),
      point: { operator: "+", value: 10 },
    },
    {
      store: "새싹 까페",
      date: new Date("2023-06-01T13:23"),
      point: { operator: "-", value: 300 },
    },
  ],
};

const PointPage = () => {
  return <PointList pointHistory={dummy} />;
};

export default PointPage;

export const loader = async () => {};
