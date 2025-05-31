import { TExternalValue } from "./wrapper";

export interface ISelectedDate {
  date: Date;
  day: number;
  endDate: Date | null;
  isEndDate: boolean;
  isStartDate: boolean;
  month: number;
  monthFromOne: number;
  startDate: Date;
  value: TExternalValue;
  weekDay: number;
  year: number;
}

export interface IWeekDayNames {
  fullName: string;
  shortName: string;
}

export interface IMonthName {
  fullName: string;
}
