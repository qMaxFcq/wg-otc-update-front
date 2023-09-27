import { createContext, useContext, ReactNode, useState } from "react";
import * as GetOrderHistoryAPI from "../api/order-detail-api";

interface OrderHistoryType {
    orderHistory: string;
}

interface OrdeWithdrawDepositType {
    orderWithdrawDeposit: string;
}

interface GetOtcHistoryValue {
    fetchOrderOTC: (page: number, formattedDate: any) => void;
    fetchWithdrawDeposit: (formattedDate: Date, token: string) => void;
    setDateContext: (newDate: any) => void;
    orderHistory: OrderHistoryType | null;
    orderWithdrawDeposit: OrdeWithdrawDepositType | null;
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
    const [orderWithdrawDeposit, setOrderWithdrawDeposit] =
        useState<OrdeWithdrawDepositType | null>(null);

    const [formattedDateCon, setFormattedDate] = useState(null);

    const fetchOrderOTC = async (requestData: any) => {
        try {
            const res = await GetOrderHistoryAPI.GetOrderHistory(requestData);
            setOrderHistory(res.data);
        } catch (error) {
            console.log("error from addNewOrderOTC", error);
        }
    };

    const fetchWithdrawDeposit = async (requestData: any) => {
        try {
            const res = await GetOrderHistoryAPI.GetWithdrawDepositAllCoin(
                requestData
            );
            setOrderWithdrawDeposit(res.data);
        } catch (error) {
            console.log("error from addNewOrderOTC", error);
        }
    };

    const setDateContext = (newDate: any) => {
        setFormattedDate(newDate);
        console.log(formattedDateCon);
    };

    const contextValue: GetOtcHistoryValue = {
        orderHistory,
        fetchOrderOTC,
        orderWithdrawDeposit,
        fetchWithdrawDeposit,
        setDateContext,
    };

    return (
        <GetOrderOtcContext.Provider value={contextValue}>
            {children}
        </GetOrderOtcContext.Provider>
    );
};
