import { Badge } from "@/components/ui/badge";
import { useGetOrderContext } from "@/context/getOrderHistoryContext";

type Props = {};

export default function WithdrawDepositCoin({}: Props) {
    const { orderHistory } = useGetOrderContext();

    if (
        !orderHistory ||
        !orderHistory.totalsByCoin ||
        !orderHistory.additionalData
    ) {
        return <div>{/* <p></p> */}</div>;
    }

    const totalsByCoin: any = orderHistory.totalsByCoin;
    const additionalData: any = orderHistory.additionalData;

    const formatNumberWithCommasAndDecimals = (
        number: number,
        decimals: number
    ): string => {
        return number.toLocaleString(undefined, {
            maximumFractionDigits: decimals,
        });
    };

    const totalUsdtSellFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.USDT_THB.SELL,
        2
    );
    const totalBtcSellFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.BTC_THB.SELL,
        8
    );
    const totalEthSellFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.ETH_THB.SELL,
        8
    );
    const totalBnbSellFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.BNB_THB.SELL,
        8
    );

    const totalUsdtBuyFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.USDT_THB.BUY,
        2
    );
    const totalBtcBuyFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.BTC_THB.BUY,
        8
    );
    const totalEthBuyFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.ETH_THB.BUY,
        8
    );
    const totalBnbBuyFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.BNB_THB.BUY,
        8
    );
    // element implicitly has an 'any' type because expression of tpye '4' can't be used to index type 'Number' property '4' does not existon on type 'Number'
    const totalUsdtSellFromApi = formatNumberWithCommasAndDecimals(
        additionalData[4].amount,
        2
    );
    const totalBtcSellFromApi = formatNumberWithCommasAndDecimals(
        additionalData[5].amount,
        8
    );
    const totalEthSellFromApi = formatNumberWithCommasAndDecimals(
        additionalData[6].amount,
        8
    );
    const totalBnbSellFromApi = formatNumberWithCommasAndDecimals(
        additionalData[7].amount,
        8
    );

    const totalUsdtBuyFromApi = formatNumberWithCommasAndDecimals(
        additionalData[0].amount,
        2
    );
    const totalBtcBuyFromApi = formatNumberWithCommasAndDecimals(
        additionalData[1].amount,
        8
    );
    const totalEthBuyFromApi = formatNumberWithCommasAndDecimals(
        additionalData[2].amount,
        8
    );
    const totalBnbBuyFromApi = formatNumberWithCommasAndDecimals(
        additionalData[3].amount,
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
