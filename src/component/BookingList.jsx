import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingList.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "https://hotel-backend-sa05.onrender.com/get-bookings"
        );
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.date.includes(searchTerm)
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center heading mb-4 fw-bold">Booking List</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="🔍 Search by Name or Date (DD/MM/YYYY)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover luxurious-table">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Show Time</th>
              <th>Date</th>
              <th>Persons</th>
              <th>Payment ID</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.mobile}</td>
                  <td>{booking.showTime}</td>
                  <td>{booking.date}</td>
                  <td>{booking.personCount}</td>
                  <td>{booking.paymentId}</td>
                  <td>₹{booking.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-danger fw-bold">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
