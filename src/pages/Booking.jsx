import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./booking.css";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [showTime, setShowTime] = useState("6PM-9PM");
  const [date, setDate] = useState("");
  const [personCount, setPersonCount] = useState(1);
  const [error, setError] = useState("");
  const ticketPrice = 499;
  const totalPrice = personCount * ticketPrice;

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    const formattedDate = inputDate.split("-").reverse().join("/"); // Convert YYYY-MM-DD to DD/MM/YYYY
    setDate(formattedDate);
  };

  const personIncree = () => {
    setPersonCount((prev) => prev + 1);
  };

  const personDecree = () => {
    setPersonCount((prev) => Math.max(1, prev - 1));
  };

  const handlePayment = async () => {
    // Validate required fields
    if (!name || !email || !mobile || !date || !showTime) {
      setError("All fields are required!");
      return;
    }
    setError(""); // Clear error message

    try {
      const { data } = await axios.post("https://hotel-backend-sa05.onrender.com/create-order", {
        amount: totalPrice,
        name,
        email,
        mobile,
        showTime,
        date,
        personCount,
      });

      const options = {
        key: "rzp_test_RIJmuH8cQwVzLT",
        amount: data.amount * 100,
        currency: "INR",
        name: "Theatre Booking",
        description: `Booking for ${personCount} persons`,
        order_id: data.id,
        handler: async function (response) {
          await axios.post("https://hotel-backend-sa05.onrender.com/save-booking", {
            name,
            email,
            mobile,
            showTime,
            date,
            personCount,
            paymentId: response.razorpay_payment_id,
            orderId: data.id,
            amount: totalPrice,
          });
          alert("Payment Successful!");
        },
        prefill: { name, email, contact: mobile },
        theme: { color: "#007bff" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="booking-container">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4 heading">Book Your Show</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Mobile *"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Show Time:</label>
          <select
            className="form-select"
            value={showTime}
            onChange={(e) => setShowTime(e.target.value)}
            required
          >
            <option value="6PM-9PM">6PM - 9PM</option>
            <option value="9PM-12AM">9PM - 12AM</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Select Date:</label>
          <input
            type="date"
            className="form-control"
            onChange={handleDateChange}
            required
          />
          {date && <p className="mt-2 text-muted">Selected Date: {date}</p>}
        </div>
        <div className="mb-3 text-center">
          <label className="form-label fw-bold">Number of Persons:</label>
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={personDecree}
            >
              -
            </button>
            <span className="fw-bold fs-5">{personCount}</span>
            <button
              className="btn btn-outline-primary mx-2"
              onClick={personIncree}
            >
              +
            </button>
          </div>
        </div>
        <h3 className="text-center text-success">Total Price: ₹{totalPrice}</h3>
        {/* <button className="btn btn-primary w-100 mt-3" >
        
        </button> */}
        <button className="button-74" role="button" onClick={handlePayment}>
          {" "}
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Booking;
