import { createBrowserRouter } from "react-router-dom";
import Login from "../Authentication/User/Login/Login";
import RegisterPage from "../Authentication/User/Registration/Registration";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ProductsPage from "../Pages/Products/ProductsPage";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import BlogCard from "../Pages/Blogs/Blogs";
import CartPage from "../Pages/Cart/CartPage";
import Weather from "../Pages/Weather/Weather";
import Dashboard from "../Dashboard/index";
import ProfileUpdate from "../Dashboard/common/Profile/Profile";
import CheckoutForm from "../Pages/checkout/CheckoutForm";
import ProductsList from "../Dashboard/components/Farmer/ProductsList";
import AddProducts from "../Dashboard/components/Farmer/AddProducts";
import OrderList from "../Dashboard/components/Farmer/OrderList";
import AllProducts from "../Dashboard/components/Admin/AllProducts";
import AllUsers from "../Dashboard/components/Admin/AllUsers";
import BlogsPage from "../Dashboard/components/Admin/BlogPage";
import ReviewList from "../Dashboard/components/Admin/ReviewLIst";
import Unauthorized from "../Shared/Unauthorized";
import ProtectedRoute from "../Shared/ProtectedRoute";
import AdminDashboard from "../Dashboard/components/Admin/AdminDashboard";
import FarmerDashboard from "../Dashboard/components/Farmer/FarmerDashboard";
import AllOrderList from "../Dashboard/components/Admin/AllOrderList";
import UserDashboard from "../Dashboard/components/User/UserDashboard";
import CartTable from "../Dashboard/components/User/CartTable";


// Define your routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/blogs", element: <BlogCard /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutForm /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/weather", element: <Weather /> },
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/unauthorized", element: <Unauthorized /> },

  {
    path: "/dashboard/farmer",
    element: (
      <ProtectedRoute requiredRole="farmer">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <FarmerDashboard /> },
      { path: "profile", element: <ProfileUpdate /> },
      { path: "products", element: <ProductsList /> },
      { path: "add-products", element: <AddProducts /> },
      { path: "orders", element: <OrderList /> },
    ]
  },
  {
    path: "/dashboard/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "products", element: <AllProducts /> },
      { path: "blogs", element: <BlogsPage /> },
      { path: "users", element: <AllUsers /> },
      { path: "orders", element: <AllOrderList /> },
      { path: "reviews", element: <ReviewList /> },
    ]
  },
  {
    path: "/dashboard/customer",
    element: (
      <ProtectedRoute requiredRole="customer">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <UserDashboard /> },
      { path: "profile", element: <ProfileUpdate /> },
      { path: "carts", element: <CartTable /> },  // Customer-specific orders
      // Add any other customer-specific routes here
    ]
  }
  
]);
