import { useState } from "react";
import axios from "axios";
// import "../styles/global.css";
const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: 1,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated API URL to point to your hosted backend on Render
      await axios.post("https://restaurant-backend-oonu.onrender.com/api/create-booking", formData);
      setSuccess(true);
      setError("");
    } catch (err) {
      setSuccess(false);
      setError("Failed to book. Slot may be already taken.");
    }
  };

  return (
    <>
      {/* Background Circles */}
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>
      <div className="background-circle circle3"></div>
      <div className="background-circle circle4"></div>

      {/* Booking Form Container */}
      <div className="container">
        <div className="card">
          <h1 className="title">Table Booking Form</h1>
          <form onSubmit={handleSubmit} className="booking-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              min="1"
              max="10"
              onChange={handleChange}
              className="form-input"
              required
            />
            <button type="submit" className="button book-button">
              Book Now
            </button>
          </form>
          {success && <p className="success-message">Booking successful!</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default BookingForm;
