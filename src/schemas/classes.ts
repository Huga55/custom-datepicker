export interface IDatepickerHeaderDateClasses {
  headerDateWrapperClassName?: string;
  monthClassName?: string;
  yearClassName?: string;
}

export interface IDatepickerHeaderClasses {
  dateClassName?: IDatepickerHeaderDateClasses;
  headerWrapperClassName?: string;
  leftArrowClassName?: string;
  rightArrowClassName?: string;
}

export interface IDatepickerYearpickerClasses {
  activeYearClsaaName?: string;
  wrapperClassName?: string;
  yearClassName?: string;
  yearRowClassName?: string;
  yearsClassName?: string;
}

export interface IDatepickerDaysClasses {
  dayClassName?: string;
  fromCurrentMonthClassName?: string;
  fromNextMonthClassName?: string;
  fromPrevMonthClassName?: string;
  inRangeClassName?: string;
  lessThanMinClassName?: string;
  moreThanMaxClassName?: string;
  selectedClassName?: string;
  selectedEndClassName?: string;
  selectedStartClassName?: string;
  todayClassName?: string;
}

export interface IDatepickerWeeksClasses {
  daysClassName?: IDatepickerDaysClasses;
  weekClassName?: string;
  weeksWrapperClassName?: string;
}

export interface IDatepickerBodyClasses {
  bodyWrapperClassName?: string;
  weeksClassName?: IDatepickerWeeksClasses;
}

export interface IDatepickerWeekdaysClasses {
  weekdayClassName?: string;
  weekdaysWrapperClassName?: string;
}

export interface IDatepickerClasses {
  bodyClassName?: IDatepickerBodyClasses;
  datepickerClassName?: string;
  headerClassName?: IDatepickerHeaderClasses;
  weekdaysClassName?: IDatepickerWeekdaysClasses;
}

export interface IDatepickerWrapperClasses extends IDatepickerClasses {
  windowClassName?: string;
  wrapperClassName?: string;
  yearpickerClassName?: IDatepickerYearpickerClasses;
}
