import {
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getWeeksInMonth,
  getYear,
  isValid,
  setDate,
  startOfMonth,
  subMonths,
} from "date-fns";

import { IDatepickerDay } from "../components/DatepickerDay/DatepickerDay.interface";
import { ISelectedDate } from "../schemas/date";

export const getParsedDate = (date: Date) => {
  const day = getDate(date);
  const month = getMonth(date);
  const year = getYear(date);
  const weekDay = getDay(date) || 7;

  return {
    day,
    month,
    weekDay,
    year,
  };
};

export const isToday = (date: Date) => {
  const todayDate = new Date();

  const {
    day: today,
    month: todayMonth,
    year: todayYear,
  } = getParsedDate(todayDate);

  const { day, month, year } = getParsedDate(date);

  return today === day && todayMonth === month && todayYear === year;
};

export const getWeeksAndDays = (date: Date) => {
  const daysAmountInCurrentMonth = getDaysInMonth(date);
  const weeksAmountInCurrentMonth = getWeeksInMonth(date, {
    weekStartsOn: 1,
  });

  const firstDayOfFirstWeek = (getDay(startOfMonth(date)) || 7) - 1; // Sunday is "0", but needed to be "7";

  const weeksAndDays: IDatepickerDay[][] = [];

  // Adding days of current month
  for (let i = 0; i < weeksAmountInCurrentMonth; i++) {
    const days: IDatepickerDay[] = weeksAndDays[i] || [];

    const startDayNumber = i === 0 ? firstDayOfFirstWeek : 0;

    for (let k = 0, j = startDayNumber; j < 7; j++, k++) {
      const prevWeek = weeksAndDays[i - 1];
      const lastDayOfPrevWeek =
        i > 0 ? prevWeek[prevWeek.length - 1].number : 0;

      const currentMonthDayNumber = lastDayOfPrevWeek + k + 1;

      const nextMonthDayNumber =
        currentMonthDayNumber - daysAmountInCurrentMonth;

      const isFullCurrentDays =
        currentMonthDayNumber > daysAmountInCurrentMonth;

      days.push({
        isFromCurrentMonth: !isFullCurrentDays,
        isFromNextMonth: isFullCurrentDays,
        isFromPrevMonth: false,
        isToday:
          !isFullCurrentDays && isToday(setDate(date, currentMonthDayNumber)),
        number: isFullCurrentDays ? nextMonthDayNumber : currentMonthDayNumber,
      });
    }

    weeksAndDays.push(days);
  }

  // Adding days of prev month
  const lastMonthDate = subMonths(date, 1);
  const lastDaysAmountOfPrevMonth = firstDayOfFirstWeek;
  const daysAmountInPrevMonth = getDaysInMonth(lastMonthDate);
  const firstFittedDayOfPrevMonth =
    daysAmountInPrevMonth - lastDaysAmountOfPrevMonth;

  const prevDays: IDatepickerDay[] = [];

  for (let i = firstFittedDayOfPrevMonth; i < daysAmountInPrevMonth; i++) {
    prevDays.push({
      isFromCurrentMonth: false,
      isFromNextMonth: false,
      isFromPrevMonth: true,
      isToday: false,
      number: i,
    });
  }

  weeksAndDays[0].unshift(...prevDays);

  return weeksAndDays;
};

export const isValidDate = (date?: any) => {
  return date && isValid(new Date(format(date, "yyyy-MM-dd")));
};

export const isValidRange = (start: string, end: string) => {
  const [dayStart, monthStart, yearStart] = start.split(".");

  const [dayEnd, monthEnd, yearEnd] = end.split(".");

  return (
    new Date(+yearStart, +monthStart - 1, +dayStart) <=
    new Date(+yearEnd, +monthEnd - 1, +dayEnd)
  );
};

export const isValidInputDate = (value?: string) => {
  if (!value) {
    return false;
  }

  const isValidFormat = value.match(/^\d{2}\.\d{2}\.\d{4}$/);

  const [day, month, year] = value.split(".");

  const isValidMonth = +month > 0 && +month <= 12;
  const isValidYear = +year > 1000;

  if (!isValidMonth || !isValidYear || !isValidFormat) return false;

  const date = new Date(+year, +month - 1);

  const daysAmountInMonth = getDaysInMonth(date);

  const isValidDay = +day > 0 && +day <= daysAmountInMonth;

  return isValidDay;
};

export const isValidRangeInputDate = (
  value?: string,
  rangeDivider?: string
) => {
  if (!value) return {};

  const dividedDate = value.split(rangeDivider || "");

  if (dividedDate.length !== 2) return {};

  const [startDate, endDate] = dividedDate;

  const isValidEndDate = isValidInputDate(endDate);
  const isValidStartDate = isValidInputDate(startDate);

  return {
    isValidEndDate,
    isValidRange:
      isValidStartDate && isValidEndDate && isValidRange(startDate, endDate),
    isValidStartDate,
  };
};

export const getCorrectMonthByMonthPosition = (
  currentMonth: number,
  isPrevMonth: boolean,
  isNextMonth: boolean
) => {
  let correctMonth = currentMonth;

  if (isPrevMonth) correctMonth -= 1;
  if (isNextMonth) correctMonth += 1;

  return correctMonth;
};

export const areTheSameDates = (
  firstDate: Date,
  secondDate: Date,
  clearDay?: boolean
) => {
  const correctFirstDate = clearDay ? setDate(firstDate, 1) : firstDate;
  const correctSecondDate = clearDay ? setDate(secondDate, 1) : secondDate;

  return correctFirstDate.getTime() === correctSecondDate.getTime();
};

export const removeTimeFromDate = (date?: Date) => {
  if (!date) return date;

  return new Date(format(date, "yyyy-MM-dd"));
};

export const getSelectedDateObj = (
  date: Date,
  startDate: Date,
  endDate: Date | null,
  isStartDate: boolean
): ISelectedDate => {
  const { day, month, year, weekDay } = getParsedDate(date);

  return {
    date,
    day,
    endDate,
    isEndDate: !isStartDate,
    isStartDate,
    month,
    monthFromOne: month + 1,
    startDate,
    value: [startDate, endDate],
    weekDay,
    year,
  };
};
