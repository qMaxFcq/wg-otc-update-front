import React, { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { useGetOrderContext } from "@/context/getOrderHistoryContext";
import { useAddNewOrderContext } from "@/context/addNewOrderContext";
import { Input } from "@/components/ui/input";

interface Order {
    id: number;
    symbol: string;
    price: number;
    amount: number;
    cost: number;
    customer: string;
    side: string;
}

export default function History() {
    const { orderHistory, fetchOrderOTC } = useGetOrderContext();
    const { editOrderOTC } = useAddNewOrderContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [date, setDate] = useState<Date | null>(null);
    const [editedOrder, setEditedOrder] = useState<Order | null>(null);
    const token = localStorage.getItem("token");

    const formattedDate = date
        ? date.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
          })
        : null;

    const handleEditOrder = (order: Order) => {
        setEditedOrder(order);
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editedOrder) {
            const editedData = {
                id: editedOrder.id,
                symbol: editedOrder.symbol,
                side: editedOrder.side,
                price: editedOrder.price,
                amount: editedOrder.amount,
                customer: editedOrder.customer,
            };

            try {
                await editOrderOTC(editedOrder.id, editedData, token);
                setEditedOrder(null);
                const requestData = {
                    formattedDate,
                    currentPage,
                    token,
                };
                fetchOrderOTC(requestData);
            } catch (error) {
                console.log("Error from handleSaveEdit", error);
            }
        }
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    useEffect(() => {
        const requestData = {
            formattedDate,
            currentPage,
            token,
        };
        fetchOrderOTC(requestData);
    }, [formattedDate, currentPage]);

    if (!orderHistory || !orderHistory.data) {
        return (
            <div className="fixed ml-64 inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="w-[700px] rounded-md m-auto bg-white border-2 border-black  shadow-2xl">
            <div className="m-auto w-[700px] p-3">
                <div className="text-2xl">Order History</div>
                <div className="">
                    <div className="space-x-2 flex justify-end ">
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
                        <Button onClick={prevPage} disabled={currentPage <= 1}>
                            Previous
                        </Button>
                        <Button
                            onClick={nextPage}
                            disabled={orderHistory.data.length < 10}
                        >
                            Next
                        </Button>
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
                        <TableBody className="text-sm">
                            {orderHistory.data
                                .slice()
                                .sort((a: Order, b: Order) => a.id - b.id)
                                .map((order: Order, index: number) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            {(currentPage - 1) * 10 + index + 1}
                                        </TableCell>{" "}
                                        {/* คำนวณเลข No. ตามหน้าและ index */}
                                        <TableCell>{order.symbol}</TableCell>
                                        <TableCell>{order.side}</TableCell>
                                        <TableCell>
                                            {Number(order.price).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {Number(
                                                order.amount
                                            ).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {Number(order.cost).toLocaleString(
                                                undefined,
                                                { minimumFractionDigits: 2 }
                                            )}
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

            {editedOrder && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center m-auto">
                    <div className="bg-white p-8 border-black border-2 rounded-lg shadow-md w-[530px]">
                        <div className="text-3xl mb-6">Edit From</div>
                        <form onSubmit={handleSaveEdit}>
                            <div className="mb-4">
                                <div className="flex flex-row gap-6 mb-4">
                                    <div className="flex flex-col">
                                        <div>
                                            <p>Edited Coin</p>
                                        </div>
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
                                    </div>
                                    <div className="flex flex-col">
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
                                                <SelectItem value="BUY">
                                                    BUY
                                                </SelectItem>
                                                <SelectItem value="SELL">
                                                    SELL
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col">
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
                                                <SelectItem value="BTZ">
                                                    BTZ
                                                </SelectItem>
                                                <SelectItem value="INVX">
                                                    INVX
                                                </SelectItem>
                                                <SelectItem value="OKX">
                                                    OKX
                                                </SelectItem>
                                                <SelectItem value="BK">
                                                    BK
                                                </SelectItem>
                                                <SelectItem value="Z">
                                                    Z
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <p>Edit Price</p>
                                <Input
                                    type="text"
                                    id="editedPrice"
                                    value={editedOrder.price}
                                    onChange={(e) => {
                                        const value = String(e.target.value);
                                        if (!isNaN(value)) {
                                            setEditedOrder({
                                                ...editedOrder,
                                                price: String(value),
                                            });
                                        } else {
                                            setEditedOrder({
                                                ...editedOrder,
                                                price: 0,
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <p>Edit Amount</p>
                                <Input
                                    type="text"
                                    id="editedAmount"
                                    value={editedOrder.amount}
                                    onChange={(e) => {
                                        const value = String(e.target.value);
                                        if (!isNaN(value)) {
                                            setEditedOrder({
                                                ...editedOrder,
                                                amount: String(value),
                                            });
                                        } else {
                                            setEditedOrder({
                                                ...editedOrder,
                                                amount: 0,
                                            });
                                        }
                                    }}
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
