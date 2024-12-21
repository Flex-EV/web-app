import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from 'lucide-react';
import FlexCard from '@/modules/ui/components/FlexCard';

interface FlexCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  highlightDates?: Date[];
  markedDates?: Date[];
  size?: 'sm' | 'md' | 'lg';
}

const FlexCalendar: React.FC<FlexCalendarProps> = ({
  selectedDate = new Date(),
  onDateSelect,
  className = '',
  disablePastDates = false,
  disableFutureDates = false,
  highlightDates = [],
  markedDates = [],
  size = 'md',
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }[size];

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (disablePastDates && date < today) return true;
    if (disableFutureDates && date > today) return true;
    return false;
  };

  const isDateHighlighted = (date: Date) => {
    return highlightDates.some(
      (highlightDate) =>
        highlightDate.getDate() === date.getDate() &&
        highlightDate.getMonth() === date.getMonth() &&
        highlightDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateMarked = (date: Date) => {
    return markedDates.some(
      (markedDate) =>
        markedDate.getDate() === date.getDate() &&
        markedDate.getMonth() === date.getMonth() &&
        markedDate.getFullYear() === date.getFullYear()
    );
  };

  const isSelectedDate = (date: Date) => {
    return (
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const handleDateClick = (dayNumber: number) => {
    const selectedDate = new Date(currentYear, currentMonth, dayNumber);
    if (!isDateDisabled(selectedDate)) {
      onDateSelect?.(selectedDate);
    }
  };

  return (
    <FlexCard
      title={
        <div className="flex items-center gap-2">
          <CalendarIcon size={18} className="text-gray-500" />
          <span>Calendar</span>
        </div>
      }
      className={`${sizeClasses} ${className}`}
    >
      <div className="p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {months[currentMonth]} {currentYear}
          </h2>
          <div className="flex gap-1">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          {/* Weekdays */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center py-2 text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before the first day of the month */}
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="h-12 border-b border-r border-gray-100 last:border-r-0"
                />
              ))}

            {/* Calendar days */}
            {Array(daysInMonth)
              .fill(null)
              .map((_, index) => {
                const dayNumber = index + 1;
                const date = new Date(currentYear, currentMonth, dayNumber);
                const disabled = isDateDisabled(date);
                const highlighted = isDateHighlighted(date);
                const marked = isDateMarked(date);
                const selected = isSelectedDate(date);

                return (
                  <button
                    key={dayNumber}
                    onClick={() => handleDateClick(dayNumber)}
                    disabled={disabled}
                    className={`
                    h-12 relative border-b border-r border-gray-100 last:border-r-0
                    transition-colors
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-50'}
                    ${selected ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}
                    ${highlighted ? 'bg-blue-50/50' : ''}
                  `}
                  >
                    <span className="relative z-10">{dayNumber}</span>
                    {marked && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                    )}
                    {selected && (
                      <span className="absolute inset-1 border-2 border-blue-200 rounded-md pointer-events-none" />
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </FlexCard>
  );
};

export default FlexCalendar;
