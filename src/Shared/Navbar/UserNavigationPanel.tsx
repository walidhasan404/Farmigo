
import { Link } from "react-router-dom";
import { removeFromSession } from "../../common/session";
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";


const UserNavigationPanel = () => {
    const {userAuth, setUserAuth} = useAuth()
    
    const name = userAuth?.name;
    const signOutUser = () =>{
        removeFromSession("user")
        setUserAuth(null)

    }
  return (
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <div className="flex flex-col">
        <Link to={`/user/${name}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard" className="link pl-8 py-4">
          Dashboard
        </Link>
        </div> 
       
        <span className="absolute border-t border-grey w-[100%]"></span>
            <button 
                className="text-left p-4 hover:bg-grey w-full pl-8 py-4" 
                onClick={signOutUser}
            >
                <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                <p className="text-dark-grey">@{name}</p>
            </button>
      </div>
  );
};

export default UserNavigationPanel;
