import { ReactNode } from "react";

import { IDatepickerYearpickerClasses } from "../../schemas/classes";

import { IDatepicker } from "../../schemas/datepicker";

export type TYearpickerFromDatepicker = Pick<
  IDatepicker,
  | "className"
  | "currentDate"
  | "monthsNames"
  | "renderHeaderDate"
  | "renderHeaderMonth"
  | "renderHeaderYear"
  | "renderLeftArrow"
  | "renderLeftArrowBtn"
  | "renderRightArrow"
  | "renderRightArrowBtn"
>;

export interface IRenderYear {
  onClickYear?(): void;
  yearValue?: number;
}

export interface IYearpickerCommon {
  firstShowedYear?: number;
  onChangeYear?(year: number): void;
  renderYear?(data: IRenderYear): ReactNode;
  selectedDate?: Date | null;
  yearpickerClassName?: IDatepickerYearpickerClasses;
  yearsOnRowAmount?: number;
  yearsRowsAmount?: number;
}

export interface IYearpicker
  extends TYearpickerFromDatepicker,
    IYearpickerCommon {}
