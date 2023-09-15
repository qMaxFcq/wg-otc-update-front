import React, { createContext, useContext, ReactNode, useState } from "react";
import * as GetOrderHistoryAPI from "../api/order-detail-api";

interface OrderHistoryType {
    orderHistory: string;
}

interface GetOtcHistoryValue {
    fetchOrderOTC: () => void;
    orderHistory: OrderHistoryType | null;
}

const GetOrderOtcContext = createContext<GetOtcHistoryValue | undefined>(
    undefined
);

export const useGetOrderContext = () => {
    const context = useContext(GetOrderOtcContext);

    if (!context) {
        throw new Error(
            "useGetOrderContext must be used within an useGetOrderContextProvider"
        );
    }

    return context;
};

interface GetOrderContextProviderProps {
    children: ReactNode;
}

export const GetOrderContextProvider = ({
    children,
}: GetOrderContextProviderProps) => {
    const [orderHistory, setOrderHistory] = useState<OrderHistoryType | null>(
        null
    );

    const fetchOrderOTC = async () => {
        try {
            const res = await GetOrderHistoryAPI.GetOrderHistory();
            setOrderHistory(res.data);
        } catch (error) {
            console.log("error from addNewOrderOTC", error);
        }
    };

    const contextValue: GetOtcHistoryValue = { orderHistory, fetchOrderOTC };

    return (
        <GetOrderOtcContext.Provider value={contextValue}>
            {children}
        </GetOrderOtcContext.Provider>
    );
};