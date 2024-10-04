import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Components/Avatar/Avatar";
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";
import UserNavigationPanel from "./UserNavigationPanel";
import CartButton from "../Button/CartButton";

const Navbar = () => {

const { userAuth } = useAuth();
/* The lines `const token = userAuth?.token;` and `const profile_img = userAuth?.profile_img;` are
using optional chaining (`?.`) to access the `token` and `profile_img` properties from the
`userAuth` object. For Saving from Type Error : Property 'name' does not exist on type 'User | null'.ts(2339) */
const token = userAuth?.token;
const profile_img = userAuth?.profile_img;

const [userNavPanel, setUserNavPanel] = useState(false)
 //console.log(userAuth.data.profile_img);

 const handleUserNavPanel = () =>{
  setUserNavPanel(prev => !prev)
}

const handleBlur = () =>{
  //why i setTimout use 
  setTimeout(()=>{
      setUserNavPanel(false)
  }, 200)
  
}
  return (
    <nav className="">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex items-center space-x-4">
              <img
                className="w-auto h-8"
                src="https://www.farmioagri.com/cdn/shop/files/vinayakk.png?v=1717508736&width=500"
                alt=""
              />
              <h1 className="text-2xl font-bold">FarmiGo</h1>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {/*  Menu open: "hidden", Menu closed: "block"  */}
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              ></path>
            </svg>

            {/* Menu open: "block", Menu closed: "hidden" */}
            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link
              to={"/"}
              className="text-base text-black transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Home{" "}
            </Link>

            <Link
              to={"/Products"}
              className="text-base text-black transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Products{" "}
            </Link>

            <Link
              to={"/blogs"}
              className="text-base text-black transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Blogs{" "}
            </Link>

            <Link
              to={"/weather"}
              className="text-base text-black transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Weather{" "}
            </Link>
          </div>
          // i working here
          <CartButton/>
          <div>
            {token ? (
               <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
               <button className="w-12 h-12 mt-1">
               <Avatar src={profile_img || ''} alt="User Avatar" />
               </button>

                 {/* useernavigation */}
                 {
                     userNavPanel ?  <UserNavigationPanel/> : ""
                 }
               

             </div>
             
            ) : (
              <Link
                to="/login"
                title=""
                className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
                role="button"
              >
                {" "}
                Login{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
