import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();

    const removeNavFooter =
      location.pathname.includes("login") || location.pathname.includes("sign-up")
    return (
      <div>
        {removeNavFooter || <Navbar/>}
        <Outlet></Outlet>
        {removeNavFooter || <Footer/>}
      </div>
    );
  };

export default Main;