import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddNewOrderContext } from "@/context/addNewOrderContext";

interface InputState {
    side: string;
    symbol: string;
    price: number | string;
    amount: number | string;
    customer: string;
}

const initialInput: InputState = {
    side: "",
    symbol: "",
    price: "",
    amount: "",
    customer: "",
};

export default function AddOrderPage() {
    const { addNewOrderOTC } = useAddNewOrderContext();
    const [input, setInput] = useState<InputState>(initialInput);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericValue = !isNaN(parseFloat(value))
            ? parseFloat(value)
            : value;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: numericValue,
        }));
    };

    const handleAddOrder = async () => {
        try {
            await addNewOrderOTC(input);
            window.alert("เพิ่มข้อมูลเรียบร้อย");
            setInput(initialInput);
        } catch (error) {
            console.error("Error adding new order:", error);
        }
    };

    return (
        <div className="w-[1200px] border-2 rounded-md m-auto">
            <div className="m-auto w-[550px] p-5">
                <div className="text-4xl text-white mb-2">Add New OTC</div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <div className="flex flex-row">
                            <CardContent>
                                <p>Coin</p>
                                <Select
                                    name="symbol"
                                    onValueChange={(value) => {
                                        setInput({
                                            ...input,
                                            symbol: String(value),
                                        });
                                    }}
                                    defaultValue={String(input.customer)}
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
                            </CardContent>
                            <CardContent>
                                <p>Order Type</p>
                                <Select
                                    name="side"
                                    onValueChange={(value) => {
                                        setInput({
                                            ...input,
                                            side: String(value),
                                        });
                                    }}
                                    defaultValue={String(input.customer)}
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
                            </CardContent>
                        </div>
                        <div className="flex flex-row">
                            <CardContent>
                                <p>Price</p>
                                <Input
                                    className="w-[140px]"
                                    type="number"
                                    name="price"
                                    value={input.price}
                                    onChange={handleInputChange}
                                />
                            </CardContent>
                            <CardContent>
                                <p>Amount</p>
                                <Input
                                    className="w-[200px]"
                                    type="number"
                                    name="amount"
                                    value={input.amount}
                                    onChange={handleInputChange}
                                />
                            </CardContent>
                        </div>
                        <CardContent>
                            <p>Customer</p>
                            <Select
                                name="customer"
                                onValueChange={(value) => {
                                    setInput({
                                        ...input,
                                        customer: String(value),
                                    });
                                }}
                                defaultValue={String(input.customer)}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BTZ">BTZ</SelectItem>
                                    <SelectItem value="INNOX">INNOX</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                className="mt-5 bg-slate-500"
                                type="button"
                                variant="outline"
                                onClick={handleAddOrder}
                            >
                                Button
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
