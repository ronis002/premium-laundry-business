'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarPickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarPicker({ value, onChange, minDate = new Date() }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date(minDate);
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !value) return false;
    return (
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    );
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    setDirection(-1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setDirection(1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-background border rounded-xl p-4 shadow-lg w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousMonth}
          className="h-8 w-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <AnimatePresence mode="wait">
          <motion.h3
            key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 20 }}
            className="font-semibold text-lg"
          >
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </motion.h3>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextMonth}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 50 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => date && !isDateDisabled(date) && onChange(date)}
              disabled={isDateDisabled(date)}
              className={`
                h-10 w-full rounded-lg text-sm font-medium transition-all
                ${!date ? 'invisible' : ''}
                ${isDateDisabled(date) ? 'text-muted-foreground/40 cursor-not-allowed' : 'hover:bg-[#FF6B00]/10'}
                ${isDateSelected(date) ? 'bg-[#FF6B00] text-white hover:bg-[#FF6B00]' : ''}
                ${isToday(date) && !isDateSelected(date) ? 'border-2 border-[#FF6B00]' : ''}
              `}
            >
              {date?.getDate()}
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Selected Date Display */}
      {value && (
        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">Selected Date</p>
          <p className="font-semibold text-[#FF6B00]">
            {DAYS[value.getDay()]}, {MONTHS[value.getMonth()]} {value.getDate()}, {value.getFullYear()}
          </p>
        </div>
      )}
    </div>
  );
}
