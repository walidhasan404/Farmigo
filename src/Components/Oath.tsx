import React from "react";

import {authWithGoogle} from "../Authentication/AuthProvider/firebase.config.ts"
import { useAuth } from "../Authentication/AuthProvider/AuthContext.tsx";
import axios from "axios";



const Oath: React.FC = () => {
  const { user, setUser, login, logout, isAuthenticated } = useAuth();
    

    const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        authWithGoogle()
        .then((user) => {
                const userData = {
                    accessToken: user?.accessToken,
                    displayName: user?.displayName,
                    email: user?.email
                }

                login(userData)

                setUser(userData)

                const serverRoute = '/google-auth'
                const formData = {
                    access_token :user.accessToken
                }


                axios.post(serverRoute, formData)
                .then((res) => {
                    console.log('Token verified by backend', res.data);
                })
                .catch((error) => {
                    console.log('Error verifying token', error);
                })
        })
        
    }
    return (
      <button onClick={(e) => handleGoogleAuth(e)} className="w-full  text-green-700 py-2 rounded-md hover:shadow-md shadow  flex items-center justify-center">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </button>
    );

}




export default Oath;
