"use server";
import dayjs from "dayjs";

let count = 0;

type Result = {
  count: number;
  time: string;
};
export const getServerProps = async (): Promise<Result> => {
  count++;
  const result: Result = {
    count,
    time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };
  // 模拟延迟返回结果
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 200);
  });
};

export const getHomeProps = async (): Promise<any> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "home" });
    }, 2000);
  });
};
