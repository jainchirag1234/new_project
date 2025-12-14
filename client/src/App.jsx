import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Registration from "./Pages/Registration/Registration";
import Dashboard from "./Pages/Registration/Dashboard";
import UserUpdate from "./Pages/Registration/UserUpdate";
import BlogPage from "./Pages/Blogs/BlogUseState";
import BlogRedux from "./Pages/Blogs/Redux/BlogRedux";
import Navbar from "./components/Navbar";
import BillingUseState from "./Pages/Billing/BillingUseState";
import BillingRedux from "./Pages/Billing/Redux/BillingRedux";
import CartUseState from "./Pages/Shopping Cart/CartUseState";
import CartUsingRedux from "./Pages/Shopping Cart/Redux/CartUseRedux";
import CarUseState from "./Pages/Car Rental/CarUseState";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/update/:id" element={<UserUpdate />} />

          <Route path="/blog/state" element={<BlogPage />} />
          <Route path="/blog/redux" element={<BlogRedux />} />

          <Route path="/billing/state" element={<BillingUseState />} />
          <Route path="/billing/redux" element={<BillingRedux />} />

          <Route path="/cart/state" element={<CartUseState />} />
          <Route path="/cart/redux" element={<CartUsingRedux />} />

          <Route path="/car" element={<CarUseState />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
