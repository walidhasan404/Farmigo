import { Link, Navigate } from 'react-router-dom';
import Oath from '../../../Components/Oath';
import { useAuth } from '../../AuthProvider/AuthContext';
import { useState } from 'react';
import { userAuthThroughServer } from '../../../common/Hooks/fetchUser';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const { userAuth, setUserAuth } = useAuth();
  const token = userAuth?.token;
  const serverRoute = '/login';
  
  const initialInput = {
    email: '',
    password: ''
  };

  const [input, setInput] = useState(initialInput);
  const [isBangla, setIsBangla] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = await userAuthThroughServer(serverRoute, input);
      toast.success(isBangla ? 'লগইন সফল' : 'Login successful');
      setUserAuth(userData);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    token ? <Navigate to='/' /> :
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          {isBangla ? 'ফার্মিগোতে স্বাগতম' : 'Welcome to Farmigo'}
        </h2>
        <button 
          onClick={() => setIsBangla(!isBangla)} 
          className="mb-4 text-green-600"
        >
          {isBangla ? 'English' : 'বাংলায় দেখুন'}
        </button>
        <form onSubmit={handleLoginSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {isBangla ? 'ইমেইল' : 'Email'}
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder={isBangla ? 'আপনার ইমেইল লিখুন' : 'Enter your email'}
              name="email" 
              value={input.email} 
              onChange={handleInputChange} 
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {isBangla ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder={isBangla ? 'আপনার পাসওয়ার্ড লিখুন' : 'Enter your password'}
              name="password" 
              value={input.password} 
              onChange={handleInputChange} 
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-green-600 text-white py-2 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4">
            {isBangla ? 'লগইন' : 'Login'}
          </button>
        </form>
        {/* Google Login Button */}
        <Oath />

        {/* Register Link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          {isBangla ? 'একাউন্ট নেই?' : "Don't have an account?"}{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            {isBangla ? 'এখানে সাইন আপ করুন' : 'Sign up here'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
