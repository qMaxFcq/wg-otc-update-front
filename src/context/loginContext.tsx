import { createContext, useContext, ReactNode } from "react";
import * as LoginApi from "../api/login-api";

// Define the shape of the context value
interface LoginContextValue {
    userLogin: (input: any) => Promise<void>;
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
    const userLogin = async (loginData: any) => {
        try {
            const response = await LoginApi.login(loginData);
            // console.log("Response from userLogin:", response.data.token);
            localStorage.setItem("token", response.data.token);
            return response;

            // หรือจะส่งค่า response ไปยังส่วนอื่นของแอปพลิเคชันก็ได้
        } catch (error) {
            console.log("error from userLogin", error);
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
