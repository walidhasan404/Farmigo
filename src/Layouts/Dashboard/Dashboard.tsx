import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define user roles
type UserRole = 'admin' | 'farmer' | 'consumer';

// Admin Dashboard Component
const AdminDashboard: React.FC = () => (
  <div className="p-6 rounded-md shadow">
    <h1 className="text-2xl font-bold mb-4 text-red-600">Admin Dashboard</h1>
    <nav>
      <ul className="space-y-3">
        <li><a className="text-black hover:underline" href="#">Manage Users</a></li>
        <li><a className="text-black hover:underline" href="#">Handle Requested Products</a></li>
        <li><a className="text-black hover:underline" href="#">Handle Added Products by Farmers</a></li>
        <li><a className="text-black hover:underline" href="#">Update/Delete Products</a></li>
      </ul>
    </nav>
  </div>
);

// Farmer Dashboard Component
const FarmerDashboard: React.FC = () => (
  <div className="p-6 rounded-md shadow">
    <h1 className="text-2xl font-bold mb-4 text-green-600">Farmer Dashboard</h1>
    <nav>
      <ul className="space-y-3">
        <li><a className="text-black hover:underline" href="#">Add Products</a></li>
        <li><a className="text-black hover:underline" href="#">View My Products</a></li>
        <li><a className="text-black hover:underline" href="#">Edit My Products</a></li>
      </ul>
    </nav>
  </div>
);

// Consumer Dashboard Component
const ConsumerDashboard: React.FC = () => (
  <div className="p-6 rounded-md shadow">
    <h1 className="text-2xl font-bold mb-4 text-blue-600">Consumer Dashboard</h1>
    <nav>
      <ul className="space-y-3">
        <Link to="/"><li><a className="text-black hover:underline" href="#">Home</a></li></Link>
        <li><a className="text-black hover:underline" href="#">My Cart</a></li>
        <li><a className="text-black hover:underline" href="#">Purchase History</a></li>
        <li><a className="text-black hover:underline" href="#">Join as Farmer</a></li>
      </ul>
    </nav>
  </div>
);

const Dashboards: React.FC = () => {
  const [role, setRole] = useState<UserRole>('consumer'); // Default role is 'consumer'

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value as UserRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-1/4 p-6 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold mb-6">Multi-Role Dashboard</h1>
        <label className="block mb-4">
          <span className="text-lg">Select Role:</span>
          <select
            value={role}
            onChange={handleRoleChange}
            className="mt-2 w-full bg-gray-700 border-none rounded-md p-2 text-white focus:outline-none"
          >
            <option value="admin">Admin</option>
            <option value="farmer">Farmer</option>
            <option value="consumer">Consumer</option>
          </select>
        </label>
      </div>

      <div className="flex-1 p-6">
        {role === 'admin' && <AdminDashboard />}
        {role === 'farmer' && <FarmerDashboard />}
        {role === 'consumer' && <ConsumerDashboard />}
      </div>
    </div>
  );
};

export default Dashboards;
