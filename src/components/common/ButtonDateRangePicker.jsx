import OutsideAlerter from "@/hooks/OutsideAlerter";
import { Button } from "@windmill/react-ui";
import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from "date-fns";
import React, { useState } from "react";
import { DateRange, DateRangePicker, DefinedRange } from "react-date-range";
import { FiCalendar } from "react-icons/fi";
import moment from "moment";
import { vi } from "date-fns/locale";
import { Controller } from "react-hook-form";

const ButtonDateRangePicker = ({
  control,
  name = "date_range",
  onChangeDate = () => {},
}) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const handleOnChange = (onChange) => (item) => {
    onChange([item.selection]);
    onChangeDate && onChangeDate();
  };

  return (
    <OutsideAlerter onClickOutside={() => setIsOpenDatePicker(false)}>
      <Controller
        control={control}
        name={name}
        render={({
          field: {
            onChange,
            value = [
              {
                startDate: new Date(),
                endDate: subDays(new Date(), 6),
                key: "selection",
              },
            ],
            ref,
          },
        }) => (
          <>
            <Button onClick={() => setIsOpenDatePicker(!isOpenDatePicker)}>
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                {moment(value?.at(0)?.startDate).format("DD-MM-YYYY")} đến
                {" "}
                {moment(value?.at(0)?.endDate).format("DD-MM-YYYY")}
              </div>
            </Button>
            {isOpenDatePicker && (
              <div className="absolute right-1 ">
                {screen.width > 600 ? (
                  <div className="shadow-lg border">
                    <DateRangePicker
                      onChange={handleOnChange(onChange)}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={1}
                      direction="vertical"
                      ranges={value}
                      inputRanges={[]}
                      locale={vi}
                      staticRanges={defaultStaticRanges}
                      ref={ref}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="shadow-lg border">
                      <DateRange
                        onChange={handleOnChange(onChange)}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        direction="vertical"
                        ranges={value}
                        className=""
                        inputRanges={[]}
                        locale={vi}
                        staticRanges={defaultStaticRanges}
                        ref={ref}
                      />
                    </div>
                    <div className="shadow-lg border float-right">
                      <DefinedRange
                        onChange={handleOnChange(onChange)}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        direction="vertical"
                        ranges={value}
                        inputRanges={[]}
                        locale={vi}
                        staticRanges={defaultStaticRanges}
                        ref={ref}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      />
    </OutsideAlerter>
  );
};

const defineds = {
  startOfWeek: startOfWeek(new Date(), { weekStartsOn: 1 }),
  endOfWeek: endOfWeek(new Date(), { weekStartsOn: 1 }),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOfLastYear: startOfYear(addYears(new Date(), -1)),
  endOfLastYear: endOfYear(addYears(new Date(), -1)),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range?.startDate, definedRange?.startDate) &&
      isSameDay(range?.endDate, definedRange?.endDate)
    );
  },
};

const createStaticRanges = (ranges) => {
  return ranges?.map((range) => ({ ...staticRangeHandler, ...range }));
};

const defaultStaticRanges = createStaticRanges([
  {
    label: "Hôm nay",
    range: () => ({
      startDate: defineds?.startOfToday,
      endDate: defineds?.endOfToday,
    }),
  },
  {
    label: "Hôm qua",
    range: () => ({
      startDate: defineds?.startOfYesterday,
      endDate: defineds?.endOfYesterday,
    }),
  },

  {
    label: "Tuần này",
    range: () => ({
      startDate: defineds?.startOfWeek,
      endDate: defineds?.endOfWeek,
    }),
  },
  {
    label: "Tuần trước",
    range: () => ({
      startDate: defineds?.startOfLastWeek,
      endDate: defineds?.endOfLastWeek,
    }),
  },
  {
    label: "Tháng này",
    range: () => ({
      startDate: defineds?.startOfMonth,
      endDate: defineds?.endOfMonth,
    }),
  },
  {
    label: "Tháng trước",
    range: () => ({
      startDate: defineds?.startOfLastMonth,
      endDate: defineds?.endOfLastMonth,
    }),
  },
  {
    label: "Năm nay",
    range: () => ({
      startDate: defineds?.startOfYear,
      endDate: defineds?.endOfYear,
    }),
  },
  {
    label: "Năm trước",
    range: () => ({
      startDate: defineds?.startOfLastYear,
      endDate: defineds?.endOfLastYear,
    }),
  },
]);

export default ButtonDateRangePicker;
