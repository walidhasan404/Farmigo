import { Link } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";
import useGetData from "../../common/Hooks/useGetData"


const Sidebar = () => {
    const {userAuth} = useAuth()
    const token = userAuth?.token

    const {userRole} = useGetData(token)
  return (
    <div className="hidden lg:flex flex-col h-screen bg-white shadow-lg w-64">
    <div className="flex items-center justify-center py-6">
        <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full">
                <i className="fas fa-circle text-white"></i>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">Farmigo</span>
        </div>
    </div>
   
    <nav className="flex-1 px-4">
        <ul className="space-y-4">
            <li className="flex items-center text-blue-600">
                <i className="fas fa-home mr-3"></i>
                <span>Dashboard</span>
            </li>
            {
        userRole === "admin" && (
            <> 
            <Link to={'/dashboard/user'} className="flex items-center text-gray-400">
                <i className="fas fa-shopping-cart mr-3"></i>
                <span>Users</span>
            </Link>
            <Link to={'/dashboard/products'} className="flex items-center text-gray-400">
                <i className="fas fa-shopping-cart mr-3"></i>
                <span>Products</span>
            </Link>
            <Link to={'/dashboard/order'} className="flex items-center text-gray-400">
                <i className="fas fa-shopping-cart mr-3"></i>
                <span>Orders</span>
            </Link>
            </>
        )
    }
            {
                userRole === "Farmer" ? (
                    <>
                    <Link to={'/dashboard/profile'} className="flex items-center text-gray-400">
                        <i className="fas fa-shopping-cart mr-3"></i>
                        <span>Products</span>
                    </Link>
                    <li className="flex items-center text-gray-400">
                        <i className="fas fa-table mr-3"></i>
                        <span>Orders</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                        <i className="fas fa-th-large mr-3"></i>
                        <span>Kanban</span>
                    </li>
                    </>
                ):(
                    <>
                    <Link to={'/dashboard/delivary-add'} className="flex items-center text-gray-400">
                        <i className="fas fa-shopping-cart mr-3"></i>
                        <span>Delivary Address</span>
                    </Link>
                    <Link to={'/dashboard/carts'} className="flex items-center text-gray-400">
                        <i className="fas fa-shopping-cart mr-3"></i>
                        <span>Carts</span>
                    </Link>
                    </>
                )
            }
            <Link to={'/dashboard/profile'} className="flex items-center text-gray-400">
                <i className="fas fa-user mr-3"></i>
                <span>Profile</span>
            </Link>
           
        </ul>
    </nav>
   
</div>
  )
}

export default Sidebar