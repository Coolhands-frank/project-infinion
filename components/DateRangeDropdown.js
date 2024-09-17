"use client"
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function DateRangeDropdown() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center w-full mx-2 font-medium text-gray-800"
      >
        {startDate && endDate
          ? `${format(startDate, 'MM/dd/yyyy')} - ${format(endDate, 'MM/dd/yyyy')}`
          : 'Select Date Range'}
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-4 flex justify-between">
            {/* Start Date */}
            <div className="mr-2">
              <label className="block text-xs font-medium text-gray-700">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* End Date */}
            <div className="ml-2">
              <label className="block text-xs font-medium text-gray-700">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
