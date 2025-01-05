import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/global.css"; // Reuse global styles for consistency
import "react-calendar/dist/Calendar.css"; // React Calendar's default styles

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const formattedDate = date.toLocaleDateString("en-CA"); // 'yyyy-mm-dd' format
        const res = await axios.get("https://restaurant-backend-oonu.onrender.com/api/get-bookings", {
          params: { date: formattedDate },
        });
        setBookings(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [date]);

  return (
    <>
      {/* Background Circles */}
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>
      <div className="background-circle circle3"></div>
      <div className="background-circle circle4"></div>

      {/* Calendar Container */}
      <div className="container">
        <div className="card">
          <h1 className="title">View Calendar</h1>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} className="custom-calendar" />
          </div>
          <h2 className="subtitle">
            Bookings for <span>{date.toDateString()}</span>:
          </h2>

          {/* Error Handling */}
          {error && <p className="error-message">{error}</p>}

          {/* Loading Spinner */}
          {loading ? (
            <p className="loading-message">Loading...</p>
          ) : (
            <ul className="booking-list">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <li key={booking._id} className="booking-item">
                    <span className="time">{booking.time}</span> - {booking.name} (
                    {booking.guests} guests)
                  </li>
                ))
              ) : (
                <li className="no-bookings">No bookings available for this date</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarView;
