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
    const depositWithdrawnDataByAsset = additionalData.reduce(
        (result: any, item: any) => {
            const exchangeId = item.exchange_id;
            const assetId = item.asset_id;

            if (!result[exchangeId]) {
                result[exchangeId] = {};
            }

            if (!result[exchangeId][assetId]) {
                result[exchangeId][assetId] = {
                    deposit: 0,
                    withdrawn: 0,
                };
            }

            result[exchangeId][assetId].deposit += parseFloat(item.deposit);
            result[exchangeId][assetId].withdrawn += parseFloat(item.withdrawn);

            return result;
        },
        {}
    );

    const usdtBinanceWithdrawn =
        depositWithdrawnDataByAsset[1]?.[2]?.withdrawn || 0;
    const btcBinanceWithdrawn =
        depositWithdrawnDataByAsset[1]?.[3]?.withdrawn || 0;
    const ethBinanceWithdrawn =
        depositWithdrawnDataByAsset[1]?.[4]?.withdrawn || 0;

    const usdtBinanceDeposit =
        depositWithdrawnDataByAsset[1]?.[2]?.deposit || 0;
    const btcBinanceDeposit = depositWithdrawnDataByAsset[1]?.[3]?.deposit || 0;
    const ethBinanceDeposit = depositWithdrawnDataByAsset[1]?.[4]?.deposit || 0;

    const usdtOkxWithdrawn =
        depositWithdrawnDataByAsset[2]?.[2]?.withdrawn || 0;

    const totalUsdtWithdrawn = usdtBinanceWithdrawn + usdtOkxWithdrawn;

    const formatNumberWithCommasAndDecimals = (
        value: number | string,
        decimals: number
    ): string => {
        if (!value) {
            return "0";
        }
        const numericValue =
            typeof value === "string" ? parseFloat(value) : value;
        const options = {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
        };
        return numericValue.toLocaleString(undefined, options);
    };

    const totalUsdtSellFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.USDT_THB.SELL,
        2
    );
    const totalBtcSellFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.BTC_THB.SELL,
        6
    );
    const totalEthSellFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.ETH_THB.SELL,
        6
    );
    const totalBnbSellFromEmp = formatNumberWithCommasAndDecimals(0, 6);

    const totalUsdtBuyFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.USDT_THB.BUY,
        2
    );
    const totalBtcBuyFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.BTC_THB.BUY,
        6
    );
    const totalEthBuyFromEmp = formatNumberWithCommasAndDecimals(
        totalsByCoin.ETH_THB.BUY,
        6
    );
    const totalBnbBuyFromEmp = formatNumberWithCommasAndDecimals(0, 6);

    const totalUsdtSellFromApi = formatNumberWithCommasAndDecimals(
        totalUsdtWithdrawn,
        2
    );

    const totalBtcSellFromApi = formatNumberWithCommasAndDecimals(
        btcBinanceWithdrawn,
        6
    );
    const totalEthSellFromApi = formatNumberWithCommasAndDecimals(
        ethBinanceWithdrawn,
        6
    );

    const totalBnbSellFromApi = formatNumberWithCommasAndDecimals(0, 6);

    const totalUsdtBuyFromApi = formatNumberWithCommasAndDecimals(
        usdtBinanceDeposit,
        2
    );
    const totalBtcBuyFromApi = formatNumberWithCommasAndDecimals(
        btcBinanceDeposit,
        6
    );
    const totalEthBuyFromApi = formatNumberWithCommasAndDecimals(
        ethBinanceDeposit,
        6
    );
    const totalBnbBuyFromApi = formatNumberWithCommasAndDecimals(0, 6);

    return (
        <div className="mt-28  flex flex-wrap gap-3  justify-between my-4  ">
            <Badge className="min-w-[200px] text-sm flex flex-col mb-1  rounded-md  border-2 border-black hover:scale-105 transition  shadow-2xl">
                <p>Total USDT Buy</p>
                <p className="mb-2">
                    {totalUsdtBuyFromEmp} / {totalUsdtBuyFromApi}
                </p>
                <p>Total USDT Sell</p>
                {totalUsdtSellFromEmp} / {totalUsdtSellFromApi}
            </Badge>

            <Badge className="min-w-[200px] text-sm flex flex-col mb-1  rounded-md  border-2 border-black hover:scale-105 transition  shadow-2xl">
                <p>Total BTC Buy</p>
                <p className="mb-2">
                    {totalBtcBuyFromEmp} / {totalBtcBuyFromApi}{" "}
                </p>
                <p>Total BTC Sell</p>
                {totalBtcSellFromEmp} / {totalBtcSellFromApi}
            </Badge>

            <Badge className="min-w-[200px] text-sm flex flex-col mb-1  rounded-md border-2 border-black hover:scale-105 transition   shadow-2xl">
                <p>Total ETH Buy</p>
                <p className="mb-2">
                    {totalEthBuyFromEmp} / {totalEthBuyFromApi}
                </p>
                <p>Total ETH Sell</p>
                {totalEthSellFromEmp} / {totalEthSellFromApi}
            </Badge>

            <Badge className="min-w-[200px] text-sm flex flex-col mb-1  rounded-md  border-2 border-black hover:scale-105 transition   shadow-2xl">
                <p>Total BNB Buy</p>
                <p className="mb-2">
                    {" "}
                    {totalBnbBuyFromEmp} / {totalBnbBuyFromApi}
                </p>
                <p>Total BNB Sell</p>
                {totalBnbSellFromEmp} / {totalBnbSellFromApi}
            </Badge>
        </div>
    );
}
