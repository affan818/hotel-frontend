import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
// import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingList from "./component/BookingList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Booking />} />
        <Route path="/bookings" element={<BookingList />} />
      </Routes>
    </Router>
  );
}

export default App;
