import React, { FC, memo, useCallback } from "react";

import clsx from "clsx";
import { addMonths, differenceInDays, setDate, subMonths } from "date-fns";

import { weekDaysNames } from "./Datepicker.constants";
import styles from "./Datepicker.module.scss";
import DatepickerDay from "./components/DatepickerDay";
import DatepickerHeader from "./components/DatepickerHeader";
import { ISelectedDate } from "./schemas/date";
import { IDatepicker } from "./schemas/datepicker";
import { EDatepickerDateType } from "./schemas/utils";
import {
  areTheSameDates,
  getCorrectMonthByMonthPosition,
  getParsedDate,
  getWeeksAndDays,
} from "./utils/date";

const Datepicker: FC<IDatepicker> = ({
  onChange,
  onClose,
  range,
  selectedEndDate,
  selectedStartDate,
  setSelectedEndDate,
  setSelectedStartDate,
  currentDate,
  setCurrentDate,
  showedDates,
  lastClickedDate,
  setLastClickedDate,
  hideNextDays,
  hidePrevDays,
  className,
  renderHeaderDate,
  renderHeaderMonth,
  renderHeaderYear,
  renderLeftArrow,
  renderRightArrow,
  renderWeekDay,
  maxDate,
  minDate,
  renderLeftArrowBtn,
  renderRightArrowBtn,
  renderWeekDays,
  monthsNames,
  weekdayNames: externalWeekdayNames,
}) => {
  const weeksAndDays = getWeeksAndDays(currentDate);

  const { year: currentYear, month: currentMonth } = getParsedDate(currentDate);

  const {
    day: selectedStartDay,
    month: selectedStartMonth,
    year: selectedStartYear,
  } = selectedStartDate ? getParsedDate(selectedStartDate) : {};

  const {
    day: selectedEndDay,
    month: selectedEndMonth,
    year: selectedEndYear,
  } = selectedEndDate ? getParsedDate(selectedEndDate) : {};

  const getNextMonthHandler = useCallback(() => {
    setCurrentDate(addMonths(setDate(currentDate, 1), 1));
  }, [currentDate, setCurrentDate]);

  const getPrevMonthHandler = useCallback(() => {
    setCurrentDate(subMonths(setDate(currentDate, 1), 1));
  }, [currentDate, setCurrentDate]);

  const onDayClickHandler = (
    day: number,
    isPrevMonth: boolean,
    isNextMonth: boolean
  ) => {
    let validMonth = currentMonth;

    if (isPrevMonth) validMonth -= 1;
    if (isNextMonth) validMonth += 1;

    const clickedDate = new Date(currentYear, validMonth, day);

    const { month, weekDay, year } = getParsedDate(clickedDate);

    const isEndClickedDate = !!(
      range &&
      selectedStartDate &&
      clickedDate > selectedStartDate &&
      lastClickedDate &&
      lastClickedDate === EDatepickerDateType.START
    );
    const isStartClickedDate = !isEndClickedDate;

    const newStartDate = isStartClickedDate ? clickedDate : selectedStartDate;
    const newEndDate = isEndClickedDate ? clickedDate : null;

    const selectedDateObj: ISelectedDate = {
      date: clickedDate,
      day,
      endDate: newEndDate,
      isEndDate: isEndClickedDate,
      isStartDate: isStartClickedDate,
      month,
      monthFromOne: month + 1,
      startDate: newStartDate,
      value: [newStartDate, newEndDate],
      weekDay,
      year,
    };

    onChange?.(selectedDateObj);

    if (!range || isEndClickedDate) onClose?.();

    if (isEndClickedDate) {
      setSelectedEndDate(clickedDate);

      setLastClickedDate(EDatepickerDateType.END);

      return;
    }

    setLastClickedDate(EDatepickerDateType.START);

    setSelectedStartDate(clickedDate);
    setSelectedEndDate(null);
  };

  const isSelectedDay = (
    day: number,
    isStartDay: boolean,
    isFromPrevMonth: boolean,
    isFromNextMonth: boolean
  ) => {
    const correctMonth = getCorrectMonthByMonthPosition(
      currentMonth,
      isFromPrevMonth,
      isFromNextMonth
    );

    const compareDay = isStartDay ? selectedStartDay : selectedEndDay;
    const compareMonth = isStartDay ? selectedStartMonth : selectedEndMonth;
    const compareYear = isStartDay ? selectedStartYear : selectedEndYear;

    if (!compareDay || !compareMonth || !compareYear) {
      return false;
    }

    const currentFullDate = new Date(currentYear, correctMonth, day);
    const compareDate = new Date(compareYear, compareMonth, compareDay);

    return areTheSameDates(currentFullDate, compareDate);
  };

  const isMoreThanMax = (
    day: number,
    isFromPrevMonth: boolean,
    isFromNextMonth: boolean
  ) => {
    if (!maxDate) return false;

    const correctMonth = getCorrectMonthByMonthPosition(
      currentMonth,
      isFromPrevMonth,
      isFromNextMonth
    );

    const currentFullDate = new Date(currentYear, correctMonth, day);

    return currentFullDate > maxDate;
  };

  const isLessThanMin = (
    day: number,
    isFromPrevMonth: boolean,
    isFromNextMonth: boolean
  ) => {
    if (!minDate) return false;

    const correctMonth = getCorrectMonthByMonthPosition(
      currentMonth,
      isFromPrevMonth,
      isFromNextMonth
    );

    const currentFullDate = new Date(currentYear, correctMonth, day);

    return differenceInDays(minDate, currentFullDate) > 0;
  };

  const isDayInRange = (
    day: number,
    isFromPrevMonth: boolean,
    isFromNextMonth: boolean
  ): boolean => {
    const correctMonth = getCorrectMonthByMonthPosition(
      currentMonth,
      isFromPrevMonth,
      isFromNextMonth
    );

    const date = new Date(currentYear, correctMonth, day);

    return (
      !!selectedStartDate &&
      !!selectedEndDate &&
      date > selectedStartDate &&
      date < selectedEndDate
    );
  };

  const isFirstDatepicker = areTheSameDates(currentDate, showedDates[0]);
  const isLastDatepicker = areTheSameDates(
    currentDate,
    showedDates[showedDates.length - 1]
  );

  const {
    datepickerClassName,
    bodyClassName,
    weekdaysClassName,
    headerClassName,
  } = className || {};
  const { weekdaysWrapperClassName, weekdayClassName } =
    weekdaysClassName || {};
  const { bodyWrapperClassName, weeksClassName } = bodyClassName || {};
  const { weeksWrapperClassName, weekClassName, daysClassName } =
    weeksClassName || {};

  const currentWeekdayNames = externalWeekdayNames || weekDaysNames;

  return (
    <div className={clsx(styles.datepicker, datepickerClassName)}>
      <DatepickerHeader
        className={headerClassName}
        currentMonth={currentMonth}
        currentYear={currentYear}
        hideLeftArrow={!isFirstDatepicker}
        hideRightArrow={!isLastDatepicker}
        monthsNames={monthsNames}
        renderHeaderDate={renderHeaderDate}
        renderHeaderMonth={renderHeaderMonth}
        renderHeaderYear={renderHeaderYear}
        renderLeftArrow={renderLeftArrow}
        renderLeftArrowBtn={renderLeftArrowBtn}
        renderRightArrow={renderRightArrow}
        renderRightArrowBtn={renderRightArrowBtn}
        onLeftArrowClick={getPrevMonthHandler}
        onRightArrowClick={getNextMonthHandler}
      />

      <div className={styles.subheader} />

      {renderWeekDays ? (
        renderWeekDays(currentWeekdayNames)
      ) : (
        <div className={clsx(styles.weekdays, weekdaysWrapperClassName)}>
          {currentWeekdayNames.map(({ shortName, fullName }, weekDayIndex) =>
            renderWeekDay ? (
              renderWeekDay({
                fullName,
                index: weekDayIndex,
                shortName,
              })
            ) : (
              <div
                key={shortName}
                className={clsx(styles.weekday, weekdayClassName)}
              >
                {shortName}
              </div>
            )
          )}
        </div>
      )}

      <div className={clsx(styles.body, bodyWrapperClassName)}>
        <div className={clsx(styles.weeks, weeksWrapperClassName)}>
          {weeksAndDays.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className={clsx(styles.week, weekClassName, {
                [styles["week_hide-prev"]]: hidePrevDays,
                [styles["week_hide-next"]]: hideNextDays,
              })}
            >
              {week.map((day, dayIndex) => (
                <DatepickerDay
                  key={weekIndex + dayIndex}
                  className={daysClassName}
                  {...day}
                  hideNextDays={hideNextDays}
                  hidePrevDays={hidePrevDays}
                  isDayInRange={
                    !!range &&
                    isDayInRange(
                      day.number,
                      day.isFromPrevMonth,
                      day.isFromNextMonth
                    )
                  }
                  isLessThanMin={isLessThanMin(
                    day.number,
                    day.isFromPrevMonth,
                    day.isFromNextMonth
                  )}
                  isMoreThanMax={isMoreThanMax(
                    day.number,
                    day.isFromPrevMonth,
                    day.isFromNextMonth
                  )}
                  isSelectedEndDay={isSelectedDay(
                    day.number,
                    false,
                    day.isFromPrevMonth,
                    day.isFromNextMonth
                  )}
                  isSelectedStartDay={isSelectedDay(
                    day.number,
                    true,
                    day.isFromPrevMonth,
                    day.isFromNextMonth
                  )}
                  onDayClickHandler={onDayClickHandler}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Datepicker);
