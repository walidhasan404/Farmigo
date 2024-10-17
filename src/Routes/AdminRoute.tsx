import React, { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  _id: string;
  role: string;
  name: string;
  email: string;
  profilePic: string;
}

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/api/user/profile');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && user.role === 'admin' ? (
        <div>{children}</div>
      ) : (
        <div>You do not have permission to access this page.</div>
      )}
    </div>
  );
};

export default AdminRoute;
