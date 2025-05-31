import React, { FC, memo, useEffect, useState } from "react";

import clsx from "clsx";
import { getYear } from "date-fns";

import { getParsedDate } from "../../utils/date";

import DatepickerHeader from "../DatepickerHeader";
import { IYearpicker } from "./Yearpicker.interface";
import styles from "./Yearpicker.module.scss";

const Yearpicker: FC<IYearpicker> = ({
  currentDate,
  selectedDate,
  className,
  yearsOnRowAmount = 3,
  yearsRowsAmount = 5,
  firstShowedYear,
  onChangeYear,
  yearpickerClassName,
  renderYear,
  ...headerProps
}) => {
  const [showedFirstYear, setSwhoedFirstYear] = useState(
    firstShowedYear || getYear(selectedDate || currentDate)
  );

  const { headerClassName } = className || {};
  const {
    wrapperClassName,
    yearClassName,
    yearRowClassName,
    yearsClassName,
    activeYearClsaaName,
  } = yearpickerClassName || {};

  const { month: currentMonth, year: currentYear } =
    getParsedDate(currentDate) || {};
  const { month: selectedMonth, year: selectedYear } = selectedDate
    ? getParsedDate(selectedDate)
    : {};

  const yearOffset = yearsOnRowAmount * yearsRowsAmount;

  const onGetNextYearHandler = () =>
    setSwhoedFirstYear(showedFirstYear + yearOffset);
  const onGetPrevYearHandler = () =>
    setSwhoedFirstYear(showedFirstYear - yearOffset);

  const onClickYearHandler = (clickedYear: number) => {
    onChangeYear?.(clickedYear);
  };

  useEffect(() => {
    if (firstShowedYear) setSwhoedFirstYear(firstShowedYear);
  }, [firstShowedYear]);

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <DatepickerHeader
        className={headerClassName}
        currentMonth={selectedMonth || currentMonth}
        currentYear={selectedYear || currentYear}
        onLeftArrowClick={onGetPrevYearHandler}
        onRightArrowClick={onGetNextYearHandler}
        {...headerProps}
      />

      <div className={clsx(styles.years, yearsClassName)}>
        {[...Array(yearsRowsAmount)].map((_, rowIndex) => (
          <div key={rowIndex} className={clsx(styles.row, yearRowClassName)}>
            {[...Array(yearsOnRowAmount)].map((__, yearIndex) => {
              const yearValue = showedFirstYear + yearIndex + 3 * rowIndex;

              return renderYear ? (
                renderYear?.({
                  onClickYear: () => onClickYearHandler(yearValue),
                  yearValue,
                })
              ) : (
                <button
                  key={yearIndex}
                  className={clsx(styles.year, yearClassName, {
                    [clsx(styles.year_active, activeYearClsaaName)]:
                      selectedYear === yearValue,
                  })}
                  type="button"
                  onClick={() => onClickYearHandler(yearValue)}
                >
                  <span>{yearValue}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Yearpicker);
