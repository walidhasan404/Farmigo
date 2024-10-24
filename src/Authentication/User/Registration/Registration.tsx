import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { userAuthThroughServer } from '../../../common/Hooks/fetchUser';
import { storeInSession } from '../../../common/session';
import { useAuth } from '../../AuthProvider/AuthContext';
import Oath from '../../../Components/Oath';
import { Link, Navigate } from 'react-router-dom';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const serverRoute = '/register';

const schema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).refine((password) => passwordRegex.test(password), {
    message: "Password must contain at least one uppercase letter, one number, and one special character."
  })
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const { userAuth, setUserAuth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBangla, setIsBangla] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    userAuthThroughServer(serverRoute, data)
      .then((userData) => {
        toast.success(isBangla ? 'রেজিস্ট্রেশন সফল' : 'Register Success');
        storeInSession("user", JSON.stringify(userData));
        setUserAuth(userData);
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const token = userAuth?.token;

  return (
    token ? <Navigate to='/' /> :
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600">
          {isBangla ? 'আপনার ফার্মিগো অ্যাকাউন্ট তৈরি করুন' : 'Create Your Farmigo Account'}
        </h2>
        <button 
          onClick={() => setIsBangla(!isBangla)} 
          className="mb-4 text-green-600"
        >
          {isBangla ? 'English' : 'বাংলায় দেখুন'}
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {isBangla ? 'পূর্ণ নাম' : 'Full Name'}
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={isBangla ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name'}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {isBangla ? 'ইমেইল' : 'Email'}
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={isBangla ? 'আপনার ইমেইল লিখুন' : 'Enter your email'}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {isBangla ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={isBangla ? 'একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন' : 'Create a strong password'}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className={`w-full py-2 text-white bg-green-600 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
            disabled={isSubmitting}
          >
            {isBangla ? 'রেজিস্টার' : 'Register'}
          </button>
        </form>
        <Oath />
        <p className="mt-4 text-sm text-center text-gray-600">
          {isBangla ? 'আগে থেকেই একটি অ্যাকাউন্ট আছে?' : "Already have an account?"}{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            {isBangla ? 'এখানে লগইন করুন' : 'Login here'}
          </Link>
        </p>
      </div>
    </div>
  );
}
