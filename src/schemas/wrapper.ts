import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

import { IYearpickerCommon } from "../components/Yearpicker/Yearpicker.interface";
import { IDatepickerWrapperClasses } from "./classes";
import { IDatepicker, IDatepickerCommon } from "./datepicker";
import { IDatepickerInput } from "./utils";

export type TExternalValue = [Date | null, Date | null];

export type TDatepickerPosition = "left" | "right";

export interface IDatepickerWrapper
  extends IDatepickerCommon,
    IYearpickerCommon {
  amountShowedDatepickers?: number;
  className?: IDatepickerWrapperClasses;
  endDateValue?: Date | string;
  extenalInputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  externalCurrentDate?: Date;
  horizontalDatepickers?: boolean;
  inputValue?: string;
  monthsNames?: IDatepicker["monthsNames"];
  open?: boolean;
  position?: TDatepickerPosition;
  rangeValueDivider?: string;
  renderInput?(props: IDatepickerInput): ReactNode;
  showYearpicker?: boolean;
  spaceBetweenDatepickers?: number;
  startDateValue?: Date | string;
  topMargin?: number;
  value?: TExternalValue;
}
