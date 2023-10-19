import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useGetOrderContext } from "@/context/getOrderHistoryContext";

type Props = {};

export default function WithdrawDepositCoin({}: Props) {
    const { orderHistory } = useGetOrderContext();
    console.log(orderHistory);

    if (
        !orderHistory ||
        !orderHistory.totalsByCoin ||
        !orderHistory.additionalData
    ) {
        return <div>{/* <p></p> */}</div>;
    }

    const formatNumberWithCommasAndDecimals = (number, decimals) =>
        parseFloat(number).toLocaleString(undefined, {
            maximumFractionDigits: decimals,
        });

    const totalUsdtSellFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.USDT_THB.SELL,
        2
    );
    const totalBtcSellFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.BTC_THB.SELL,
        8
    );
    const totalEthSellFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.ETH_THB.SELL,
        8
    );
    const totalBnbSellFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.BNB_THB.SELL,
        8
    );

    const totalUsdtBuyFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.USDT_THB.BUY,
        2
    );
    const totalBtcBuyFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.BTC_THB.BUY,
        8
    );
    const totalEthBuyFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.ETH_THB.BUY,
        8
    );
    const totalBnbBuyFromEmp = formatNumberWithCommasAndDecimals(
        orderHistory.totalsByCoin.BNB_THB.BUY,
        8
    );

    const totalUsdtSellFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[4].amount,
        2
    );
    const totalBtcSellFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[5].amount,
        8
    );
    const totalEthSellFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[6].amount,
        8
    );
    const totalBnbSellFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[7].amount,
        8
    );

    const totalUsdtBuyFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[0].amount,
        2
    );
    const totalBtcBuyFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[1].amount,
        8
    );
    const totalEthBuyFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[2].amount,
        8
    );
    const totalBnbBuyFromApi = formatNumberWithCommasAndDecimals(
        orderHistory.additionalData[3].amount,
        8
    );

    return (
        <div className="mt-20 mr-5">
            <div className="mb-3 ">
                <Badge className="text-sm flex flex-col mb-1 bg-white rounded-md text-black">
                    <p>Total USDT Buy</p>
                    <p className="mb-2">
                        {totalUsdtBuyFromEmp} / {totalUsdtBuyFromApi}
                    </p>
                    <p>Total USDT Sell</p>
                    {totalUsdtSellFromEmp} / {totalUsdtSellFromApi}
                </Badge>
            </div>
            <div>
                <Badge className="text-sm flex flex-col mb-1 bg-white rounded-md text-black">
                    <p>Total BTC Buy</p>
                    <p className="mb-2">
                        {totalBtcBuyFromEmp} / {totalBtcBuyFromApi}{" "}
                    </p>
                    <p>Total BTC Sell</p>
                    {totalBtcSellFromEmp} / {totalBtcSellFromApi}
                </Badge>
            </div>
            <div className="mt-3" />

            <div>
                <Badge className="text-sm flex flex-col mb-1 bg-white rounded-md text-black">
                    <p>Total ETH Buy</p>
                    <p className="mb-2">
                        {totalEthBuyFromEmp} / {totalEthBuyFromApi}
                    </p>
                    <p>Total ETH Sell</p>
                    {totalEthSellFromEmp} / {totalEthSellFromApi}
                </Badge>
            </div>
            <div className="mt-3" />

            <div>
                <Badge className="text-sm flex flex-col mb-1 bg-white rounded-md text-black">
                    <p>Total BNB Buy</p>
                    <p className="mb-2">
                        {" "}
                        {totalBnbBuyFromEmp} / {totalBnbBuyFromApi}
                    </p>
                    <p>Total BNB Sell</p>
                    {totalBnbSellFromEmp} / {totalBnbSellFromApi}
                </Badge>
            </div>
        </div>
    );
}
