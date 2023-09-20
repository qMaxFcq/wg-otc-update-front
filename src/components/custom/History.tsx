import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useGetOrderContext } from "@/context/getOrderHistoryContext";
import * as EditAPI from "../../api/edit-order-api";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

interface Order {
    id: number;
    symbol: string;
    price: number;
    amount: number;
    cost: number;
}

export default function History() {
    const { orderHistory, fetchOrderOTC } = useGetOrderContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [date, setDate] = React.useState<Date>();
    const [editedOrder, setEditedOrder] = useState<Order | null>(null);

    const formattedDate = date
        ? date.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
          })
        : "";

    useEffect(() => {
        fetchOrderOTC();
    }, []);

    const handleEditOrder = (order: Order) => {
        setEditedOrder(order);
    };

    const handleSaveEdit = async (e: any) => {
        e.preventDefault();
        const editedData = {
            id: editedOrder.id,
            symbol: editedOrder.symbol,
            side: editedOrder.side,
            price: editedOrder.price,
            amount: editedOrder.amount,
            customer: editedOrder.customer,
        };

        // เรียกใช้งาน EditAPI.editOrder() โดยส่งข้อมูลที่แก้ไข
        const res = await EditAPI.editOrder(editedOrder.id, editedData);
        setEditedOrder(null);
        fetchOrderOTC();
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    useEffect(() => {
        fetchOrderOTC(currentPage);
    }, [currentPage]);

    if (!orderHistory) {
        return <div className="m-auto">Loading...</div>;
    }

    return (
        <div className="w-[800px] h-700 rounded-md m-auto bg-white border-2 border-black  shadow-2xl">
            <div className="m-auto w-[800px] p-5">
                <div className="text-4xl mb-2">Order History</div>
                <div className="">
                    <div className="space-x-2">
                        <Button onClick={prevPage} disabled={currentPage <= 1}>
                            Previous
                        </Button>
                        <Button onClick={nextPage}>Next</Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                        date.toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Coin</TableHead>
                                <TableHead>Side</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Exchange </TableHead>
                                <TableHead>Edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderHistory.data
                                .slice()
                                .sort((a: Order, b: Order) => a.id - b.id)
                                .map((order: Order, index: number) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{order.symbol}</TableCell>
                                        <TableCell>{order.side}</TableCell>
                                        <TableCell>
                                            {Number(order.price).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {Number(order.amount).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {Number(order.cost).toFixed(2)}
                                        </TableCell>
                                        <TableCell>{order.customer}</TableCell>

                                        <TableCell>
                                            <button
                                                onClick={() =>
                                                    handleEditOrder(order)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* เงื่อนไขการแสดง Popup */}
            {editedOrder && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center m-auto">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-[350px]">
                        <form onSubmit={handleSaveEdit}>
                            <div className="mb-4">
                                <p>Edited Coin</p>
                                <Select
                                    value={editedOrder.symbol}
                                    onValueChange={(value) => {
                                        setEditedOrder({
                                            ...editedOrder,
                                            symbol: String(value),
                                        });
                                    }}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select Coin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USDT_THB">
                                            USDT_THB
                                        </SelectItem>
                                        <SelectItem value="BTC_THB">
                                            BTC_THB
                                        </SelectItem>
                                        <SelectItem value="ETH_THB">
                                            ETH_THB
                                        </SelectItem>
                                        <SelectItem value="BNB_THB">
                                            BNB_THB
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p>Edited Side</p>
                                <Select
                                    value={editedOrder.side}
                                    onValueChange={(value) => {
                                        setEditedOrder({
                                            ...editedOrder,
                                            side: String(value),
                                        });
                                    }}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BUY">BUY</SelectItem>
                                        <SelectItem value="SELL">
                                            SELL
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p>Edited Exchange</p>
                                <Select
                                    value={editedOrder.customer}
                                    onValueChange={(value) => {
                                        setEditedOrder({
                                            ...editedOrder,
                                            customer: String(value),
                                        });
                                    }}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BTZ">BTZ</SelectItem>
                                        <SelectItem value="INNOX">
                                            INNOX
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <p>Edit Price</p>
                                <Input
                                    type="text"
                                    id="editedPrice"
                                    value={editedOrder.price}
                                    onChange={(e) =>
                                        setEditedOrder({
                                            ...editedOrder,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <p>Edit Amount</p>

                                <Input
                                    type="text"
                                    id="editedAmount"
                                    value={editedOrder.amount}
                                    onChange={(e) =>
                                        setEditedOrder({
                                            ...editedOrder,
                                            amount: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Save</Button>
                                <Button
                                    onClick={() => setEditedOrder(null)}
                                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
