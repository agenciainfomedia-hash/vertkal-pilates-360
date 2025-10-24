"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker, CaptionProps, useDayPicker, DayPickerProps as ReactDayPickerProps, DropdownProps, CustomComponents } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type CalendarProps = ReactDayPickerProps & {
  showHead?: boolean;
};

// Define a local interface for the DayPicker context value
interface CustomDayPickerContextValue {
  goToMonth: (month: Date) => void;
  selectedMonth?: Date;
  // Add other properties from useDayPicker() if needed, e.g.,
  // displayMonth: Date;
  // setSelected: (date: Date | undefined) => void;
}

function Calendar({
  className,
  classNames,
  ...props
}: CalendarProps) {
  const CustomDropdown = ({ options, value, onChange }: DropdownProps) => {
    return (
      <Select
        onValueChange={(val) => {
          onChange?.({ target: { value: val } } as React.ChangeEvent<HTMLSelectElement>);
        }}
        value={value?.toString()}
      >
        <SelectTrigger className="w-[110px] h-7">
          <SelectValue>{options?.find(o => o.value === value)?.label || ""}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  const CustomCaption = (captionProps: CaptionProps) => {
    const { goToMonth, selectedMonth } = useDayPicker() as CustomDayPickerContextValue;
    const handleMonthChange = (value: string) => {
      const newDate = new Date(selectedMonth || new Date());
      newDate.setMonth(parseInt(value));
      goToMonth(newDate);
    };
    const handleYearChange = (value: string) => {
      const newDate = new Date(selectedMonth || new Date());
      newDate.setFullYear(parseInt(value));
      goToMonth(newDate);
    };

    return (
      <div className="flex gap-1">
        <Select
          onValueChange={handleMonthChange}
          value={selectedMonth ? selectedMonth.getMonth().toString() : undefined}
        >
          <SelectTrigger className="w-[110px] h-7">
            <SelectValue>{selectedMonth?.toLocaleString("default", { month: "long" })}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i} value={i.toString()}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleYearChange}
          value={selectedMonth ? selectedMonth.getFullYear().toString() : undefined}
        >
          <SelectTrigger className="w-[110px] h-7">
            <SelectValue>{selectedMonth?.getFullYear()}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 20 }, (_, i) => {
              const year = new Date().getFullYear() - 10 + i;
              return (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        caption_dropdowns: "flex gap-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: CustomDropdown,
        Caption: CustomCaption,
        IconLeft: (props: React.SVGProps<SVGSVGElement>) => <ChevronLeftIcon className="h-4 w-4" {...props} />,
        IconRight: (props: React.SVGProps<SVGSVGElement>) => <ChevronRightIcon className="h-4 w-4" {...props} />,
      } as Partial<CustomComponents>}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }