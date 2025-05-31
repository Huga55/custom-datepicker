import { ReactNode } from "react";

import { IDatepickerHeaderClasses } from "../../schemas/classes";
import { IMonthName } from "../../schemas/date";

export interface IDatepickerRenderMonth {
  monthName: IMonthName;
  monthNumber: number;
}

export interface IDatepickerRenderYear {
  currentYear: number;
}

export interface IDatepickerHeaderCommon {
  hideLeftArrow?: boolean;
  hideRightArrow?: boolean;
  renderHeaderDate?(
    headerDate: IDatepickerRenderMonth & IDatepickerRenderYear
  ): ReactNode;
  renderHeaderMonth?(headerMonth: IDatepickerRenderMonth): ReactNode;
  renderHeaderYear?(headerYear: IDatepickerRenderYear): ReactNode;
  renderLeftArrow?: ReactNode;
  renderLeftArrowBtn?(getPrevMonthHandler?: () => void): ReactNode;
  renderRightArrow?: ReactNode;
  renderRightArrowBtn?(getNextMonthHandler?: () => void): ReactNode;
}

export interface IDatePickerHeader extends IDatepickerHeaderCommon {
  className?: IDatepickerHeaderClasses;
  currentMonth: number;
  currentYear: number;
  monthsNames: IMonthName[];
  onLeftArrowClick?(): void;
  onRightArrowClick?(): void;
}
