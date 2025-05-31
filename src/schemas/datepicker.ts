import { ReactNode } from "react";

import { IDatepickerHeaderCommon } from "../components/DatepickerHeader/DatepickerHeader.interface";
import { IDatepickerClasses } from "./classes";
import { IMonthName, ISelectedDate, IWeekDayNames } from "./date";
import { TDatepickerDateTypesValue } from "./utils";

export interface IDatepickerValue {
  endDate: Date | string;
  startDate: Date | string;
}

export interface IDatepickerWeekDayRenderProps extends IWeekDayNames {
  index: number;
}

export interface IDatepickerCommon extends IDatepickerHeaderCommon {
  dateFormat?: string;
  hideNextDays?: boolean;
  hidePrevDays?: boolean;
  maxDate?: Date;
  minDate?: Date;
  onChange?(dateObj: ISelectedDate | null): void;
  onClose?(): void;
  range?: boolean;
  renderWeekDay?(weekDay: IDatepickerWeekDayRenderProps): ReactNode;
  renderWeekDays?(weekDaysNames: IWeekDayNames[]): ReactNode;
  weekdayNames?: IWeekDayNames[];
}

export interface IDatepicker extends IDatepickerCommon {
  className?: IDatepickerClasses;
  currentDate: Date;
  dateFormat?: string;
  hideNextDays?: boolean;
  hidePrevDays?: boolean;
  lastClickedDate: TDatepickerDateTypesValue | null;
  monthsNames: IMonthName[];
  onChange?(dateObj: ISelectedDate): void;
  onClose?(): void;
  range?: boolean;
  selectedEndDate: Date | null;
  selectedStartDate: Date | null;
  setCurrentDate(value: Date): void;
  setLastClickedDate(value: TDatepickerDateTypesValue | null): void;
  setSelectedEndDate(value: Date | null): void;
  setSelectedStartDate(value: Date | null): void;
  showedDates: Date[];
}
