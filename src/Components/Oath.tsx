import React, { useContext, useState } from "react";
import { authWithGoogle } from "../Authentication/AuthProvider/firebase.config";
import axios from "axios";
import { User } from "firebase/auth"; // Import the correct User type
import toast from "react-hot-toast";
import { storeInSession } from "../common/session";
import { AuthContext } from "../Authentication/AuthProvider/AuthContext";

const Oath: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { setUserAuth } = authContext;

  const [isBangla, setIsBangla] = useState(false);

  const userAuthThroughServer = (serverRoute: string, formData: {}) => {
    axios.post((import.meta as any).env.VITE_API + serverRoute, formData)
      .then(({ data }) => {
        toast.success(isBangla ? 'সফলভাবে সাইন ইন হয়েছে' : 'Sign in Successfully');
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
        console.log("User authenticated through server:", data);
      })
      .catch((err) => {
        console.error("Error authenticating user through server:", err);
      });
  };

  const handleGoogleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const user: User | null = await authWithGoogle();

      if (user) {
        const serverRoute = "/google-auth";
        const formData = {
          access_token: (user as any).accessToken || '',
        };

        userAuthThroughServer(serverRoute, formData);
      }
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={(e) => handleGoogleAuth(e)}
        className="w-full text-green-700 py-2 rounded-md hover:shadow-md shadow flex items-center justify-center"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        {isBangla ? 'গুগল দিয়ে লগইন করুন' : 'Continue with Google'}
      </button>
      <button
        title="title"
        onClick={() => setIsBangla(!isBangla)}
        className="mt-2 text-green-600"
      >
        {isBangla ? 'English' : 'বাংলা'}
      </button>
    </div>
  );
};

export default Oath;
