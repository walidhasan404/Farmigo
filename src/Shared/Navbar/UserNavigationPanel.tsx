import { useContext } from "react";
import { Link } from "react-router-dom";
import { removeFromSession } from "../../common/session";
import { AuthContext } from "../../Authentication/AuthProvider/AuthContext";


const UserNavigationPanel = () => {
    const {userAuth : {data}, setUserAuth} = useContext(AuthContext)
    console.log();
    
    const signOutUser = () =>{
        removeFromSession("user")
        setUserAuth({token : null})
    }
  return (
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${data.fullname}`} className="link pl-8 py-4">
          {/* Add more content here */}
          Profile
        </Link>
        <Link to={`/dashboard/blogs`} className="link pl-8 py-4">
          {/* Add more content here */}
          Dashboard
        </Link>
        <Link to={`/settings/edit-profile`} className="link pl-8 py-4">
          {/* Add more content here */}
          Settings
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
            <button 
                className="text-left p-4 hover:bg-grey w-full pl-8 py-4" 
                onClick={signOutUser}
            >
                <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                <p className="text-dark-grey">@{data.fullname}</p>
            </button>
      </div>
  );
};

export default UserNavigationPanel;
