import { createContext, useContext, ReactNode } from "react";
import * as LoginApi from "../api/login-api";

// Define the shape of the context value
interface LoginContextValue {
    userLogin: (input: any) => Promise<{ status: number }>;
}


// Create the context
const LoginContext = createContext<LoginContextValue | undefined>(undefined);

// Custom hook for using the context
export const useLoginContext = () => {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error(
            "useAddNewOrderContext must be used within an AddNewOrderContextProvider"
        );
    }

    return context;
};

interface LoginContextProviderProps {
    children: ReactNode;
}

export const LoginContextProvider = ({
    children,
}: LoginContextProviderProps) => {
    const userLogin = async (loginData: any): Promise<{ status: number }> => {
        try {
            const response = await LoginApi.login(loginData);
            localStorage.setItem("token", response.data.token);
            return { status: response.status };
        } catch (error) {
            console.log("error from userLogin", error);
            return { status: 500 }; 
        }
    };
    

    const contextValue: LoginContextValue = {
        userLogin,
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};
