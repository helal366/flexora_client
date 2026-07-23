import { createContext } from "react";
import { User, UserCredential } from "firebase/auth";

// 1. Define the interface for your context values
export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authLoading: boolean;
  setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userRegister: (email: string, password: string) => Promise<UserCredential>;
  userLogin: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  userProfileUpdate: (updateInfo: { displayName?: string; photoURL?: string }) => Promise<void>;
  userLogout: () => Promise<void>;
}


// 2. Pass the type to createContext and allow null as the initial value
const AuthContext=createContext<AuthContextType | null>(null);
export default AuthContext;