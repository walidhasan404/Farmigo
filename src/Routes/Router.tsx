import { createBrowserRouter } from "react-router-dom";
import Login from "../Authentication/User/Login/Login";
import RegisterPage from "../Authentication/User/Registration/Registration";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ProductsPage from "../Pages/Products/ProductsPage";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import BlogCard from "../Pages/Blogs/Blogs";
import CartPage from "../Pages/Cart/CartPage";
import CheckoutForm from "../Pages/checkout/CheckoutForm";
import Dashboards from "../Layouts/Dashboard/Dashboard";
import Weather from "../Pages/Weather/Weather";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <ProductsPage />
            },
            {
                path: "/dashboard",
                element: <Dashboards/>
            },
            {
                path: "/blogs",
                element: <BlogCard />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <CheckoutForm />
            },
            /* {
                path: "/products/grain & cereal",
                element: <Grain />
            },
            {
                path: "/products/dairy",
                element: <Dairy />
            },
            {
                path: "/products/poultry",
                element: <Poultry />
            },
            {
                path: "/products/fruit",
                element: <Fruit />

            }, */
            {
                path: "/products/:id",
                element: <ProductDetails />
            },
            {
                path: "/weather",
                element: <Weather />
            },
        ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
  ]);
