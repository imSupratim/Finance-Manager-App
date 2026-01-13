import React, { useState, useEffect } from "react";
import { User, Mail, Calendar, Award, TrendingUp, Clock } from "lucide-react";
import { getUser } from "../utils/auth";

const UserInfo = () => {
  const user = getUser();
  const userName = user.name;
  const userEmail = user.email;
  const createdAt = user.time;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const changeMonth = (delta) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const calculateDaysSinceMember = () => {
    const memberDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - memberDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4">
                  {getInitials(userName)}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">{userName}</h2>
                <div className="flex items-center justify-center gap-2 text-slate-600 text-sm">
                  <Mail className="w-4 h-4" />
                  {userEmail}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-600">Member Since</p>
                    <p className="text-sm font-semibold text-slate-800">{formatDate(createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-600">Days Active</p>
                    <p className="text-sm font-semibold text-slate-800">{calculateDaysSinceMember()} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Clock */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5" />
                <p className="text-sm font-medium opacity-90">Current Time</p>
              </div>
              <p className="text-3xl font-bold mb-1">
                {currentDate.toLocaleTimeString("en-US", { 
                  hour: "2-digit", 
                  minute: "2-digit",
                  second: "2-digit"
                })}
              </p>
              <p className="text-sm opacity-75">
                {currentDate.toLocaleDateString("en-US", { 
                  weekday: "long",
                  month: "long", 
                  day: "numeric",
                  year: "numeric" 
                })}
              </p>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Calendar
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-semibold text-slate-800 min-w-[180px] text-center">
                    {monthName}
                  </span>
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
                    {day}
                  </div>
                ))}

                {/* Empty cells for first day offset */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const today = isToday(day);
                  return (
                    <button
                      key={day}
                      className={`aspect-square rounded-lg flex items-center justify-center font-medium transition-all ${
                        today
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;