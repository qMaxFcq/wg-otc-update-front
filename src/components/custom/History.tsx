import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetOrderContext } from "@/context/getOrderHistory";
import { useEffect } from "react";

interface Order {
    id: number;
    symbol: string;
    price: number;
    amount: number;
    cost: number;
}
export default function History() {
    const { orderHistory, fetchOrderOTC } = useGetOrderContext();
    useEffect(() => {
        const interval = setInterval(() => {}, 5000);
        fetchOrderOTC();
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!orderHistory) {
        // รอให้ข้อมูลโหลดเสร็จ หรือจัดการกับกรณีที่ไม่มีข้อมูล
        return <div>Loading...</div>;
    }

    console.log(orderHistory.data);
    return (
        <div className="w-[600px] border-2 rounded-md m-auto bg-white">
            <div className="m-auto w-[550px] p-5">
                <div className="text-4xl mb-2">Order History</div>
                <div className="">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No.</TableHead>
                                <TableHead>Coin</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderHistory.data
                                .slice()
                                .sort((a: number, b: number) => a.id - b.id)
                                .map((order: Order, index: number) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{order.symbol}</TableCell>
                                        <TableCell>
                                            {Number(order.price).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {Number(order.amount).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {Number(order.cost).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
