import { useEffect, useState } from "react";
import { useGetOrderContext } from "@/context/getOrderHistoryContext";

type Props = {};

export default function WithdrawDepositCoin({}: Props) {
    const { orderWithdrawDeposit, fetchWithdrawDeposit } = useGetOrderContext();
    const [date, setDate] = useState<Date | null>(null);
    const token = localStorage.getItem("token");

    // useEffect(() => {
    //     const storedFormattedDate = localStorage.getItem("formattedDate");
    //     const requestData = {
    //         storedFormattedDate,
    //         token,
    //     };
    //     fetchWithdrawDeposit(requestData);
    // }, [formattedDate, token]);

    // console.log(orderWithdrawDeposit);

    return <div></div>;
}
