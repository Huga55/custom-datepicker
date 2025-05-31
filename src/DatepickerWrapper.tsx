import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import clsx from "clsx";
import { addMonths, format, subMonths } from "date-fns";

import useClickAway from "./hooks/useClickAway";
import useRefDimensions from "./hooks/useRefDimensions";

import Datepicker from "./Datepicker";
import { monthsNames } from "./Datepicker.constants";
import styles from "./Datepicker.module.scss";
import Yearpicker from "./components/Yearpicker";
import useGetCorrectPosition from "./hooks/useGetCorrectPosition";
import { ISelectedDate } from "./schemas/date";
import { TDatepickerDateTypesValue } from "./schemas/utils";
import { IDatepickerWrapper } from "./schemas/wrapper";
import {
  areTheSameDates,
  getSelectedDateObj,
  isValidInputDate,
  isValidRangeInputDate,
  removeTimeFromDate,
} from "./utils/date";

const DatepickerWrapperComponent: FC<IDatepickerWrapper> = ({
  open,
  onClose,
  onChange,
  renderInput,
  dateFormat = "dd.MM.yyyy",
  rangeValueDivider = " - ",
  range,
  amountShowedDatepickers = 1,
  horizontalDatepickers,
  spaceBetweenDatepickers,
  className = {},
  topMargin = 0,
  value: externalValue,
  extenalInputProps,
  maxDate: externalMaxDate,
  minDate: externdaMinDate,
  externalCurrentDate,
  showYearpicker,
  yearsOnRowAmount,
  yearsRowsAmount,
  firstShowedYear,
  onChangeYear,
  renderYear,
  position = "left",
  ...datePickerProps
}) => {
  const maxDate = removeTimeFromDate(externalMaxDate);
  const minDate = removeTimeFromDate(externdaMinDate);

  // const isStartValueValid = isValidDate(startDateValue);
  // const initialCurrentDate = isStartValueValid
  //   ? new Date(startDateValue)
  //   : new Date();
  // const initialSelectedStartDate = isStartValueValid
  //   ? new Date(startDateValue)
  //   : null;

  // const isEndValueValid = isValidDate(endDateValue);
  // const initialSelectedEndDate = isEndValueValid
  //   ? new Date(endDateValue)
  //   : null;

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastClickedDate, setLastClickedDate] =
    useState<TDatepickerDateTypesValue | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  const { refElement: wrapperRef, dimensions: wrapperDimensions } =
    useRefDimensions();

  const currentShowedDates = [...Array(amountShowedDatepickers)].map(
    (_, monthIndex) => addMonths(currentDate, monthIndex)
  );

  const getIsValidDateByMaxAndMin = useCallback(
    (value: Date | null) => {
      return (
        !value ||
        ((!minDate || value >= minDate) && (!maxDate || value <= maxDate))
      );
    },
    [maxDate, minDate]
  );

  const onCloseHandler = useCallback(() => {
    if (open) return;

    setIsOpened(false);

    onClose?.();
  }, [onClose, open]);

  const onFocusHandler = useCallback(() => setIsOpened(true), []);

  const { clickedAwayRef } = useClickAway<HTMLDivElement>({
    onClickAway: onCloseHandler,
  });

  const setCurrentDateWithCheckingShowed = useCallback(
    (date: Date) => {
      const isAlreadyShowedNewCurrentDate = currentShowedDates.some(
        (showedDate) => areTheSameDates(showedDate, date, true)
      );

      if (!isAlreadyShowedNewCurrentDate && !externalCurrentDate)
        setCurrentDate(date);
    },
    [currentShowedDates, externalCurrentDate]
  );

  const onChangeCurrentDateHandler = useCallback(
    (date: Date, datepickerIndex: number) => {
      if (externalCurrentDate) return;

      setCurrentDate(subMonths(date, datepickerIndex));
    },
    [externalCurrentDate]
  );

  const onChangeHandler = useCallback(
    (dateObj: ISelectedDate) => {
      const { date, startDate, endDate } = dateObj;

      const formatedSelectedDate = format(date, dateFormat);

      if (range) {
        const formatedStartDate = startDate && format(startDate, dateFormat);
        const formatedEndDate = endDate && format(endDate, dateFormat);

        const formatedInputDate = `${formatedStartDate}${rangeValueDivider}${
          formatedEndDate || ""
        }`;

        setInputValue(formatedInputDate);
      }

      if (!range) setInputValue(formatedSelectedDate);

      setCurrentDateWithCheckingShowed(date);

      onChange?.(dateObj);
    },
    [
      dateFormat,
      onChange,
      range,
      rangeValueDivider,
      setCurrentDateWithCheckingShowed,
    ]
  );

  const onChangeInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setInputValue(value);

      const getDateFromInputValue = (currentValue: string) => {
        const [day, month, year] = currentValue.split(".");

        return new Date(+year, +month - 1, +day);
      };

      if (!value) {
        onChange?.(null);
        setSelectedEndDate(null);
        setSelectedStartDate(null);
        return;
      }

      if (!range && (isValidInputDate(value) || !value)) {
        const inputDate = getDateFromInputValue(value);

        if (!getIsValidDateByMaxAndMin(inputDate)) {
          return;
        }

        if (
          selectedStartDate &&
          !areTheSameDates(inputDate, selectedStartDate)
        ) {
          setSelectedStartDate(inputDate);
        }

        if (!externalCurrentDate) {
          setCurrentDate(inputDate);
        }

        onChange?.(getSelectedDateObj(inputDate, inputDate, null, true));
      }

      if (range) {
        const { isValidEndDate, isValidStartDate, isValidRange } =
          isValidRangeInputDate(value, rangeValueDivider);

        if (!isValidEndDate && !isValidStartDate) return;

        const [startInputValue, endInputValue] = value.split(rangeValueDivider);

        const startValueDate = getDateFromInputValue(startInputValue);
        const endValueDate = getDateFromInputValue(endInputValue);

        if (
          !getIsValidDateByMaxAndMin(startValueDate) ||
          !getIsValidDateByMaxAndMin(endValueDate)
        )
          return;

        if (isValidStartDate) setSelectedStartDate(startValueDate);

        if (isValidEndDate)
          setSelectedEndDate(isValidRange ? endValueDate : null);

        const newCurrentDate = isValidEndDate ? endValueDate : startValueDate;

        setCurrentDateWithCheckingShowed(newCurrentDate);

        if (isValidStartDate && isValidEndDate && isValidRange) {
          onChange?.(
            getSelectedDateObj(
              isValidEndDate ? endValueDate : startValueDate,
              startValueDate,
              isValidEndDate ? endValueDate : null,
              !isValidEndDate
            )
          );
        }
      }
    },
    [
      externalCurrentDate,
      getIsValidDateByMaxAndMin,
      onChange,
      range,
      rangeValueDivider,
      selectedStartDate,
      setCurrentDateWithCheckingShowed,
    ]
  );

  useEffect(() => {
    if (!range) setSelectedEndDate(null);
  }, [range]);

  useEffect(() => {
    if (externalValue) {
      const [externalStartValue, externalEndDate] = externalValue;

      setSelectedStartDate(externalStartValue);
      setSelectedEndDate(externalEndDate);

      if (!externalStartValue) {
        setInputValue("");
        return;
      }

      const newInputStartValue = format(externalStartValue, dateFormat);

      const newInputEndValue =
        range && externalEndDate
          ? `${rangeValueDivider}${format(externalEndDate, dateFormat)}`
          : "";

      setInputValue(`${newInputStartValue}${newInputEndValue}`);
    }
  }, [externalValue, range, dateFormat, rangeValueDivider]);

  useEffect(() => {
    if (externalCurrentDate) setCurrentDate(externalCurrentDate);
  }, [externalCurrentDate]);

  const {
    onChange: externalOnChange,
    onFocus: externalOnFocus,
    ...otherExternalInputProps
  } = extenalInputProps || {};

  const inputProps = {
    className: styles.input,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeInputHandler(e);
      externalOnChange?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      onFocusHandler();
      externalOnFocus?.(e);
    },
    value: inputValue,
    ...otherExternalInputProps,
  };

  const {
    wrapperClassName = "",
    windowClassName = "",
    yearpickerClassName,
    ...otherClassNames
  } = className;

  const { horizontalCorrectPostion, windowRef } = useGetCorrectPosition({
    position,
  });

  return (
    <div
      ref={(el) => {
        clickedAwayRef.current = el;
        wrapperRef.current = el;
      }}
      className={clsx(styles.wrapper, wrapperClassName)}
    >
      {renderInput ? renderInput(inputProps) : <input {...inputProps} />}

      <div
        ref={windowRef}
        className={clsx(styles.window, windowClassName, {
          [styles.window_opened]: isOpened || open,
          [styles.window_horizontal]: horizontalDatepickers,
        })}
        style={{
          gap: `${spaceBetweenDatepickers || 0}px`,
          top: `${(wrapperDimensions.height || 0) + topMargin}px`,
          ...(horizontalCorrectPostion === "left" && { left: 0 }),
          ...(horizontalCorrectPostion === "right" && { right: 0 }),
        }}
      >
        {showYearpicker && (
          <Yearpicker
            className={otherClassNames}
            currentDate={currentShowedDates?.[0]}
            firstShowedYear={firstShowedYear}
            monthsNames={monthsNames}
            renderHeaderDate={datePickerProps.renderHeaderDate}
            renderHeaderMonth={datePickerProps.renderHeaderMonth}
            renderHeaderYear={datePickerProps.renderHeaderYear}
            renderLeftArrow={datePickerProps.renderLeftArrow}
            renderLeftArrowBtn={datePickerProps.renderLeftArrowBtn}
            renderRightArrow={datePickerProps.renderRightArrow}
            renderRightArrowBtn={datePickerProps.renderRightArrowBtn}
            renderYear={renderYear}
            selectedDate={selectedStartDate}
            yearpickerClassName={yearpickerClassName}
            yearsOnRowAmount={yearsOnRowAmount}
            yearsRowsAmount={yearsRowsAmount}
            onChangeYear={onChangeYear}
          />
        )}

        {currentShowedDates.map((showedDate, datepickerIndex) => (
          <Datepicker
            key={datepickerIndex}
            className={otherClassNames}
            currentDate={showedDate}
            dateFormat={dateFormat}
            inputValue={inputValue}
            lastClickedDate={lastClickedDate}
            maxDate={maxDate}
            minDate={minDate}
            monthsNames={monthsNames}
            range={range}
            selectedEndDate={selectedEndDate}
            selectedStartDate={selectedStartDate}
            setCurrentDate={(newCurrentDate: Date) =>
              onChangeCurrentDateHandler(newCurrentDate, datepickerIndex)
            }
            setLastClickedDate={setLastClickedDate}
            setSelectedEndDate={setSelectedEndDate}
            setSelectedStartDate={setSelectedStartDate}
            showedDates={currentShowedDates}
            onChange={onChangeHandler}
            onClose={onCloseHandler}
            {...datePickerProps}
          />
        ))}
      </div>
    </div>
  );
};

export const DatepickerWrapper = memo(DatepickerWrapperComponent);
