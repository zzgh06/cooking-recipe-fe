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
      case '6months':
        start = subDays(today, 180);
        end = new Date(today);
        break;
      case '1year':
        start = subDays(today, 365);
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
    <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:space-x-4 mb-6">
        <div className="flex flex-wrap justify-between md:space-x-3">
          <button
            className="w-[100px] text-center py-2 bg-white border border-gray-300 rounded-md mb-2 md:mb-0"
            onClick={() => handleDateRange('today')}
          >
            오늘
          </button>
          <button
            className="w-[100px] text-center py-2 bg-white border border-gray-300 rounded-md mb-2 md:mb-0"
            onClick={() => handleDateRange('week')}
          >
            일주일
          </button>
          <button
            className="w-[100px] text-center py-2 bg-white border border-gray-300 rounded-md mb-2 md:mb-0"
            onClick={() => handleDateRange('month')}
          >
            일개월
          </button>
          <button
            className="w-[100px] text-center py-2 bg-white border border-gray-300 rounded-md mb-2 md:mb-0"
            onClick={() => handleDateRange('3months')}
          >
            삼개월
          </button>
          <button
            className="w-[100px] text-center py-2 bg-white border border-gray-300 rounded-md mb-2 md:mb-0"
            onClick={() => handleDateRange('6months')}
          >
            6개월
          </button>
          <button
            className="w-[100px] text-center py-2 bg-white border border-gray-300 rounded-md mb-2 md:mb-0"
            onClick={() => handleDateRange('1year')}
          >
            1년
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            max={today.toISOString().split('T')[0]}
            min={tenYearsAgo.toISOString().split('T')[0]}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            max={today.toISOString().split('T')[0]}
            min={tenYearsAgo.toISOString().split('T')[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilterCondition;