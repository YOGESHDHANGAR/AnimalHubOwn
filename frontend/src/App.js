import React from "react";
import BottomNav from "./Components/Navbar/BottomNav";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Sell from "./Components/SellAnimal/Sell";
// import Dashboard from "./Components/Admin/Dashboard";
// import ProductList from "./component/Admin/ProductList.js";
// import NewProduct from "./component/Admin/NewProduct";
// import UpdateProduct from "./component/Admin/UpdateProduct";
// import OrderList from "./component/Admin/OrderList";
// import ProcessOrder from "./component/Admin/ProcessOrder";
// import UsersList from "./component/Admin/UsersList";
// import ProductReviews from "./component/Admin/ProductReviews";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route exact="true" path="/sell" element={<Sell />} />
        {/* <Route exact="true" path="/admin/dashboard" element={<Dashboard />} />
        <Route exact="true" path="/admin/products" element={<ProductList />} />
        <Route exact="true" path="/admin/product" element={<NewProduct />} />
        <Route
          exact="true"
          path="/admin/product/:id"
          element={<UpdateProduct />}
        />
        <Route exact="true" path="/admin/orders" element={<OrderList />} />
        {/* <Route
          exact="true"
          path="/admin/order/:id"
          element={<ProcessOrder />}
        /> */}
        {/* <Route exact="true" path="/admin/users" element={<UsersList />} /> */}
        {/* <Route
          exact="true"
          path="/admin/reviews"
          element={<ProductReviews />}
        /> */}
      </Routes>
      <BottomNav />
    </>
  );
};

export default App;
