import React from 'react';
import { subDays, subYears } from 'date-fns';

const DateFilterCondition = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const today = new Date();
  const tenYearsAgo = subYears(today, 3);

  const handleDateRange = (range) => {
    let start, end;
    switch (range) {
      case 'today':
        start = new Date(today);
        end = new Date(today);
        break;
      case 'week':
        start = subDays(today, 7);
        end = new Date(today);
        break;
      case 'month':
        start = subDays(today, 30);
        end = new Date(today);
        break;
      case '3months':
        start = subDays(today, 90);
        end = new Date(today);
        break;
      default:
        start = null;
        end = null;
    }
    if (start) {
      start.setHours(0, 0, 0, 0);
    }
    if (end) {
      end.setHours(23, 59, 59, 999);
    }
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center space-x-5">
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-auto"
            onClick={() => handleDateRange('today')}
          >
            오늘
          </button>
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-auto"
            onClick={() => handleDateRange('week')}
          >
            일주일
          </button>
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-auto"
            onClick={() => handleDateRange('month')}
          >
            일개월
          </button>
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-auto"
            onClick={() => handleDateRange('3months')}
          >
            삼개월
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              max={today.toISOString().split('T')[0]}
              min={tenYearsAgo.toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              max={today.toISOString().split('T')[0]}
              min={tenYearsAgo.toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateFilterCondition;