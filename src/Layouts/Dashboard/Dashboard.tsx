import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => (
  <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard Overview</h1>
    <p className="text-lg text-gray-700">
      Welcome to the admin panel. Use the navigation on the left to manage users, products, requests, and blogs.
    </p>
  </div>
);

const Dashboards: React.FC = () => (
  <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar */}
    <aside className="w-1/4 bg-gray-900 text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to='/dashboard/users' className="flex items-center space-x-2 text-white hover:text-blue-300 transition duration-300">
              <i className="fas fa-users"></i>
              <span>Manage Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="flex items-center space-x-2 text-white hover:text-blue-300 transition duration-300">
              <i className="fas fa-box"></i>
              <span>Manage Products</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center space-x-2 text-white hover:text-blue-300 transition duration-300">
              <i className="fas fa-tasks"></i>
              <span>Manage Requested Items</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/blogs" className="flex items-center space-x-2 text-white hover:text-blue-300 transition duration-300">
              <i className="fas fa-blog"></i>
              <span>Manage Blogs</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>

    {/* Main Content Area */}
    <main className="flex-1 p-6 bg-gray-50">
      <AdminDashboard />
      <section className="mt-6">
        <Outlet />
      </section>
    </main>
  </div>
);

export default Dashboards;
