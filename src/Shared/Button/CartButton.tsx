
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";
import { ShoppingBasket } from 'lucide-react';

const CartButton = () => {
    const {cartItems} = useAuth()
    const navigate = useNavigate();
  return (
    <div>
      {/*    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/cart')}>
          <span className="mr-2">🛒</span> {cartItems} item{cartItems !== 1 ? 's' : ''}
        </button> */}

        <button className="bg-green-700 text-white px-4 py-2 rounded-full flex items-center" onClick={() => navigate('/cart')}>
          <ShoppingBasket />
            <span className="ml-2"> {cartItems} item{cartItems !== 1 ? 's' : ''}</span>
        </button>
    </div>
  )
}

export default CartButton