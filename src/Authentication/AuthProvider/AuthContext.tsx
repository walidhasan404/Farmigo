import { createContext, useState, useEffect } from "react";
import { lookInSession } from "../../common/session";

interface User {
  accessToken: string;
  profile_img:string;
  displayName: string;
  email: string;
}

interface AuthContextType {
  userAuth: User | null;
  setUserAuth: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType | null>(
  null
);

interface AuthProviderProps {
  children: React.ReactNode;
}



    export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
      const [userAuth, setUserAuth] = useState<User | null>(null);
       
       
      useEffect(()=>{
        let userInsession = lookInSession("user");
//console.log(userInsession, "user");
        
        userInsession ? setUserAuth(JSON.parse(userInsession)) : setUserAuth(null);
      }, []);

      return (
        <AuthContext.Provider value={{ userAuth, setUserAuth }}>
          {children}
        </AuthContext.Provider>
      );
    };
