import React, { FC, memo } from "react";

import clsx from "clsx";

import styles from "../../Datepicker.module.scss";
import {
  IDatePickerHeader,
  IDatepickerRenderMonth,
  IDatepickerRenderYear,
} from "./DatepickerHeader.interface";

const DatePickerHeader: FC<IDatePickerHeader> = ({
  currentMonth,
  currentYear,
  monthsNames,
  hideLeftArrow,
  hideRightArrow,
  className,
  renderHeaderDate,
  renderHeaderMonth,
  renderHeaderYear,
  renderLeftArrow,
  renderRightArrow,
  renderLeftArrowBtn,
  renderRightArrowBtn,
  onLeftArrowClick,
  onRightArrowClick,
}) => {
  const {
    dateClassName,
    headerWrapperClassName,
    leftArrowClassName,
    rightArrowClassName,
  } = className || {};
  const { headerDateWrapperClassName, monthClassName, yearClassName } =
    dateClassName || {};

  const monthData: IDatepickerRenderMonth = {
    monthName: monthsNames[currentMonth],
    monthNumber: currentMonth,
  };

  const yearData: IDatepickerRenderYear = {
    currentYear,
  };

  return (
    <div className={clsx(styles.header, headerWrapperClassName)}>
      {renderLeftArrowBtn ? (
        renderLeftArrowBtn(onLeftArrowClick)
      ) : (
        <button
          className={clsx(styles.arrow, styles.arrow_left, leftArrowClassName, {
            [styles.arrow_hide]: hideLeftArrow,
          })}
          type="button"
          onClick={onLeftArrowClick}
        >
          {renderLeftArrow || "left"}
        </button>
      )}

      {renderHeaderDate ? (
        renderHeaderDate({
          ...yearData,
          ...monthData,
        })
      ) : (
        <div className={clsx(styles.header__date, headerDateWrapperClassName)}>
          {renderHeaderMonth ? (
            renderHeaderMonth(monthData)
          ) : (
            <div className={clsx(styles.header__month, monthClassName)}>
              {monthsNames[currentMonth].fullName}
            </div>
          )}

          {renderHeaderYear ? (
            renderHeaderYear(yearData)
          ) : (
            <div className={clsx(styles.header__year, yearClassName)}>
              {currentYear}
            </div>
          )}
        </div>
      )}

      {renderRightArrowBtn ? (
        renderRightArrowBtn(onRightArrowClick)
      ) : (
        <button
          className={clsx(
            styles.arrow,
            styles.arrow_right,
            rightArrowClassName,
            {
              [styles.arrow_hide]: hideRightArrow,
            }
          )}
          type="button"
          onClick={onRightArrowClick}
        >
          {renderRightArrow || "right"}
        </button>
      )}
    </div>
  );
};

export default memo(DatePickerHeader);
