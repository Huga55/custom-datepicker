import React, { FC, memo } from "react";

import clsx from "clsx";

import styles from "../../Datepicker.module.scss";
import { IDatepickerDayComponent } from "./DatepickerDay.interface";

const DatepickerDay: FC<IDatepickerDayComponent> = ({
  number,
  isFromCurrentMonth,
  isFromNextMonth,
  isFromPrevMonth,
  isToday,
  onDayClickHandler,
  isDayInRange,
  isSelectedEndDay,
  isSelectedStartDay,
  hideNextDays,
  hidePrevDays,
  className,
  isLessThanMin,
  isMoreThanMax,
}) => {
  const {
    dayClassName,
    fromCurrentMonthClassName,
    fromNextMonthClassName,
    fromPrevMonthClassName,
    inRangeClassName,
    selectedEndClassName,
    selectedStartClassName,
    todayClassName,
    selectedClassName,
    lessThanMinClassName,
    moreThanMaxClassName,
  } = className || {};

  const isHidden =
    (isFromPrevMonth && hidePrevDays) || (isFromNextMonth && hideNextDays);

  return (
    <button
      className={clsx(
        styles.day,
        dayClassName,
        isHidden
          ? styles.day_hidden
          : {
              [clsx(styles.day_today, todayClassName)]: isToday,
              [clsx(styles.day_prev, fromPrevMonthClassName)]: isFromPrevMonth,
              [clsx(styles.day_next, fromNextMonthClassName)]: isFromNextMonth,
              [clsx(styles.day_current, fromCurrentMonthClassName)]:
                isFromCurrentMonth,
              [clsx(styles["day_selected-start"], selectedStartClassName)]:
                isSelectedStartDay,
              [clsx(styles["day_selected-end"], selectedEndClassName)]:
                isSelectedEndDay,
              [clsx(styles.day_range, inRangeClassName)]: isDayInRange,
              [clsx(styles.dat_selected, selectedClassName)]:
                isSelectedStartDay,
              [clsx(styles["day_more-max"], moreThanMaxClassName)]:
                isMoreThanMax, // TODO is not working with external class name
              [clsx(styles["day_less-min"], lessThanMinClassName)]:
                isLessThanMin,
            }
      )}
      type="button"
      onClick={() =>
        !isMoreThanMax &&
        !isLessThanMin &&
        onDayClickHandler(number, isFromPrevMonth, isFromNextMonth)
      }
    >
      <span>{number}</span>
    </button>
  );
};

export default memo(DatepickerDay);
