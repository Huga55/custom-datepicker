import { IDatepickerDaysClasses } from "../../schemas/classes";

export interface IDatepickerDay {
  isFromCurrentMonth: boolean;
  isFromNextMonth: boolean;
  isFromPrevMonth: boolean;
  isToday: boolean;
  number: number;
}

export interface IDatepickerDayComponent extends IDatepickerDay {
  className?: IDatepickerDaysClasses;
  hideNextDays?: boolean;
  hidePrevDays?: boolean;
  isDayInRange: boolean;
  isLessThanMin?: boolean;
  isMoreThanMax?: boolean;
  isSelectedEndDay: boolean;
  isSelectedStartDay: boolean;
  onDayClickHandler(
    number: number,
    isFromPrevMonth: boolean,
    isFromNextMonth: boolean
  ): void;
}
