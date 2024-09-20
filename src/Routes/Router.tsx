import { createBrowserRouter } from "react-router-dom";

import Login from "../Authentication/User/Login/Login";
import RegisterPage from "../Authentication/User/Registration/Registration";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ProductsPage from "../Pages/Products/ProductsPage";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import Vegetable from "../Pages/Home/Sections/Categories/Vegetable/Vegetable";
import Grain from "../Pages/Home/Sections/Categories/Grain/Grain";
import Dairy from "../Pages/Home/Sections/Categories/Dairy/Dairy";
import Poultry from "../Pages/Home/Sections/Categories/Poultry/Poultry";
import Fruit from "../Pages/Home/Sections/Categories/Fruit/Fruit";



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
                path: "/products/vegetable",
                element: <Vegetable />
            },
            {
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
            },
            {
                path: "/products/:id",
                element: <ProductDetails />
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
