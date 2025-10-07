import React, { useState, useRef, useEffect } from 'react';

const DatePicker = ({
  mode = 'single',
  selectedDates,
  onDateSelect,
  minDate,
  maxDate,
  holidays = [],
  theme = 'dark',
  locale = 'en-US',
  placeholder = 'Select date'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [internalSelectedDates, setInternalSelectedDates] = useState(selectedDates || (mode === 'single' ? null : []));
  const [animating, setAnimating] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [viewMode, setViewMode] = useState('calendar');
  const inputRef = useRef();
  const calendarRef = useRef();

  useEffect(() => {
    setInternalSelectedDates(selectedDates || (mode === 'single' ? null : []));
  }, [selectedDates, mode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && calendarRef.current && !calendarRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateMonth('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateMonth('next');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    if (!internalSelectedDates) return false;
    if (mode === 'single') {
      return internalSelectedDates && internalSelectedDates.getTime() === date.getTime();
    } else {
      return internalSelectedDates.some(d => d.getTime() === date.getTime());
    }
  };

  const isInRange = (date) => {
    if (mode !== 'range') return false;
    if (internalSelectedDates && internalSelectedDates.length === 2) {
      return date >= internalSelectedDates[0] && date <= internalSelectedDates[1];
    }
    if (dragging && dragStart && dragEnd) {
      const start = dragStart < dragEnd ? dragStart : dragEnd;
      const end = dragStart < dragEnd ? dragEnd : dragStart;
      return date >= start && date <= end;
    }
    return false;
  };

  const navigateMonth = (direction) => {
    setAnimating(true);
    setTimeout(() => {
      if (direction === 'prev') {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
      } else {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
      }
      setAnimating(false);
    }, 300);
  };

  const navigateYear = (direction) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentYear(currentYear + (direction === 'next' ? 1 : -1));
      setAnimating(false);
    }, 300);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleMonthSelect = (month) => {
    setCurrentMonth(month);
    setViewMode('calendar');
  };

  const handleYearSelect = (year) => {
    setCurrentYear(year);
    setViewMode('calendar');
  };

  const handleDateSelect = (date) => {
    let newSelected;
    if (mode === 'single') {
      newSelected = date;
      setIsOpen(false);
    } else if (mode === 'range') {
      if (!internalSelectedDates || internalSelectedDates.length === 0) {
        newSelected = [date];
      } else if (internalSelectedDates.length === 1) {
        newSelected = [internalSelectedDates[0], date].sort((a, b) => a - b);
        setIsOpen(false);
      } else {
        newSelected = [date];
      }
    } else if (mode === 'multi') {
      const existingIndex = internalSelectedDates.findIndex(d => d.getTime() === date.getTime());
      if (existingIndex >= 0) {
        newSelected = internalSelectedDates.filter((_, i) => i !== existingIndex);
      } else {
        newSelected = [...internalSelectedDates, date];
      }
    }
    setInternalSelectedDates(newSelected);
    onDateSelect && onDateSelect(newSelected);
  };

  const formatSelectedDates = () => {
    if (!internalSelectedDates) return '';
    if (mode === 'single') {
      return internalSelectedDates.toLocaleDateString(locale);
    } else if (mode === 'range') {
      if (internalSelectedDates.length === 2) {
        return `${internalSelectedDates[0].toLocaleDateString(locale)} - ${internalSelectedDates[1].toLocaleDateString(locale)}`;
      } else if (internalSelectedDates.length === 1) {
        return internalSelectedDates[0].toLocaleDateString(locale);
      }
    } else if (mode === 'multi') {
      return internalSelectedDates.map(d => d.toLocaleDateString(locale)).join(', ');
    }
    return '';
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={formatSelectedDates()}
        onFocus={handleInputFocus}
        readOnly
        className={`w-full px-4 py-3 border-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white focus:ring-gray-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-lg font-medium`}
      />
      {isOpen && (
        <div
          ref={calendarRef}
          className={`absolute z-10 mt-2 w-max p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 text-gray-900'} border-2 rounded-2xl shadow-2xl backdrop-blur-sm`}
          style={{ minWidth: '320px' }}
        >
          <div className={`calendar transition-opacity duration-300 ${animating ? 'opacity-50' : 'opacity-100'}`}>
            <div className="header flex justify-between items-center mb-6">
              <button onClick={() => (viewMode === 'calendar' ? navigateMonth : navigateYear)('prev')} className={`p-3 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-full transition-all duration-200 text-2xl hover:scale-110 shadow-sm`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="font-bold text-xl text-center cursor-pointer hover:text-blue-600 transition-colors duration-200" onClick={() => setViewMode(viewMode === 'calendar' ? 'month' : viewMode === 'month' ? 'year' : 'calendar')}>
                {viewMode === 'calendar' ? `${monthNames[currentMonth]} ${currentYear}` : viewMode === 'month' ? currentYear : 'Select Year'}
              </div>
              <button onClick={() => (viewMode === 'calendar' ? navigateMonth : navigateYear)('next')} className={`p-3 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-full transition-all duration-200 text-2xl hover:scale-110 shadow-sm`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {viewMode === 'calendar' && (
              <>
                <div className="weekdays grid grid-cols-7 gap-2 mb-4">
                  {weekdayNames.map(day => (
                    <div key={day} className={`text-center text-sm font-semibold p-3 rounded-lg ${day === 'Sun' || day === 'Sat' ? 'text-red-600 bg-red-50' : theme === 'dark' ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-100'}`}>
                      {day.slice(0, 1)}
                    </div>
                  ))}
                </div>
                <div className="days grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth(currentYear, currentMonth) }, (_, i) => (
                <div key={`empty-${i}`} className="p-3"></div>
              ))}
              {Array.from({ length: daysInMonth(currentYear, currentMonth) }, (_, i) => {
                const day = i + 1;
                const date = new Date(currentYear, currentMonth, day);
                const today = isToday(date);
                const selected = isSelected(date);
                const inRange = isInRange(date);
                const isHoliday = holidays.some(h => h.date.getTime() === date.getTime());
                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(date)}
                    onMouseDown={(e) => {
                      if (mode === 'range') {
                        e.preventDefault();
                        setDragging(true);
                        setDragStart(date);
                        setDragEnd(date);
                      }
                    }}
                    onMouseEnter={() => {
                      if (dragging) setDragEnd(date);
                    }}
                    onMouseUp={() => {
                      if (dragging) {
                        setDragging(false);
                        if (dragStart && dragEnd) {
                          const start = dragStart < dragEnd ? dragStart : dragEnd;
                          const end = dragStart < dragEnd ? dragEnd : dragStart;
                          setInternalSelectedDates([start, end]);
                          onDateSelect && onDateSelect([start, end]);
                          setIsOpen(false);
                        }
                        setDragStart(null);
                        setDragEnd(null);
                      }
                    }}
                    className={`p-3 text-center rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      selected ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105' :
                      inRange ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800' :
                      today ? 'bg-gradient-to-br from-yellow-300 to-yellow-400 text-yellow-900 font-bold animate-pulse shadow-md' :
                      theme === 'dark' ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-800'
                    } ${isHoliday ? 'relative' : ''}`}
                    title={isHoliday ? holidays.find(h => h.date.getTime() === date.getTime()).label : date.toDateString()}
                  >
                    {day}
                    {isHoliday && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>}
                  </button>
                );
              })}
            </div>
              </>
            )}
            {viewMode === 'month' && (
              <div className="months grid grid-cols-3 gap-3 mt-4">
                {monthNames.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(index)}
                    className={`p-3 rounded-lg font-semibold transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-gray-600 text-gray-200 bg-gray-700' : 'hover:bg-blue-100 text-gray-800 bg-gray-50'}`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
            {viewMode === 'year' && (
              <div className="years grid grid-cols-3 gap-3 mt-4">
                {Array.from({ length: 12 }, (_, i) => currentYear - 5 + i).map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`p-3 rounded-lg font-semibold transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-gray-600 text-gray-200 bg-gray-700' : 'hover:bg-blue-100 text-gray-800 bg-gray-50'}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
