import { Month } from '../enums/month';
import { type Request } from 'express';

export function getAccessToken(req: Request) {
  let token = req.header('access_token') || req.header('authorization');
  if (token && token.toUpperCase().startsWith('BEARER ')) {
    token = token.slice('BEARER '.length);
  }
  return token;
}

export interface WeekNumAndMonth {
  month: Month;
  week: number;
}

export const weekNumAndMonth = function (date: Date): WeekNumAndMonth {
  const THURSDAY_NUM = 4; // 첫째주의 기준 목요일

  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDate.getDay();

  let firstThursday = 1 + THURSDAY_NUM - firstDayOfWeek; // 첫째주 목요일
  if (firstThursday <= 0) {
    firstThursday = firstThursday + 7; // 한주는 7일
  }
  const untilDateOfFirstWeek = firstThursday - 7 + 3; // 월요일기준으로 계산 (월요일부터 한주의 시작)
  const weekNum = Math.ceil((date.getDate() - untilDateOfFirstWeek) / 7) - 1;

  if (weekNum < 0) {
    // 첫째주 이하일 경우 전월 마지막주 계산
    const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    const result = weekNumAndMonth(lastDateOfMonth);
    return result;
  }

  const months = Object.entries(Month);
  return {
    month: months.find(
      (value) => value[1] === String(date.getMonth() + 1),
    )?.[0] as Month,
    week: weekNum,
  };
};

export const convertDatetime = (
  type: 'day' | 'time' | 'week' | 'month' | 'year',
  column: string,
) => {
  const date = {
    day: `DATE_FORMAT(${column} , '%Y-%m-%d')`, // 해당 일로 변환
    time: `HOUR(${column})`,
    week: `DATE_FORMAT(
      DATE_ADD(
        ${column}, 
        INTERVAL(8-DAYOFWEEK(${column})
      ) DAY
    ),'%Y-%m-%d')`, // 해당 주의 일요일 날짜로 변환
    month: `DATE_FORMAT(${column} , '%Y-%m')`, // 해당 월로 변환
    year: `DATE_FORMAT(${column} , '%Y')`, // 해당 년도로 변환
  };
  return date[type];
};

/**
 * @param strDate
 * @returns Date
 * 환경부에서 날짜를 주는 형식 yyyyMMddHHmmss
 * 20240117144554 와 같은 형식을 Date객체로 바꿔줌
 */
export const convertDate = (strDate: string): Date => {
  let make = '';
  for (let i = 2; i <= strDate.length - 1; i += 2) {
    if (i === 2) make += `${strDate.slice(0, 4)}`;
    if (i === 4 || i === 6) make += `-${strDate.slice(i, i + 2)}`;
    if (i === 8) make += ` ${strDate.slice(i, i + 2)}`;
    if (i >= 10) make += `:${strDate.slice(i, i + 2)}`;
  }
  return new Date(make);
};
