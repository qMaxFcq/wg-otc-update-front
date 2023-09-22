import React, { createContext, useContext, ReactNode } from "react";
import * as AddNewOrderAPi from "../api/add-order-api";
import * as EditOrderAPI from "../api/edit-order-api";

// Define the shape of the context value
interface AddNewOrderContextValue {
    addNewOrderOTC: (input: any, token: string) => Promise<void>;
    editOrderOTC: (id: any, input: any, token: string) => Promise<void>;
}

// Create the context
const AddNewOrderContext = createContext<AddNewOrderContextValue | undefined>(
    undefined
);

// Custom hook for using the context
export const useAddNewOrderContext = () => {
    const context = useContext(AddNewOrderContext);

    if (!context) {
        throw new Error(
            "useAddNewOrderContext must be used within an AddNewOrderContextProvider"
        );
    }

    return context;
};

interface AddNewOrderContextProviderProps {
    children: ReactNode;
}

export const AddNewOrderContextProvider = ({
    children,
}: AddNewOrderContextProviderProps) => {
    const addNewOrderOTC = async (input: any, token: string) => {
        try {
            await AddNewOrderAPi.addNewOrderToDB(input, token);
        } catch (error) {
            console.log("error from addNewOrderOTC", error);
        }
    };

    const editOrderOTC = async (id: any, input: any, token: string) => {
        try {
            await EditOrderAPI.editOrder(id, input, token);
        } catch (error) {
            console.log("error from editOrderOTC", error);
        }
    };

    const contextValue: AddNewOrderContextValue = {
        addNewOrderOTC,
        editOrderOTC,
    };

    return (
        <AddNewOrderContext.Provider value={contextValue}>
            {children}
        </AddNewOrderContext.Provider>
    );
};
