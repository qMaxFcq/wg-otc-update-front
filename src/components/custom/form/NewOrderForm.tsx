import React, { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// context
import { useAddNewOrderContext } from "@/context/addNewOrderContext";
import { DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { X } from "lucide-react";

interface InputState {
    side: string;
    symbol: string;
    price: number | string;
    amount: number | string;
    customer: string;
    shop_id: string;
    amount_thb: number | string;
}

const initialInput: InputState = {
    side: "SELL",
    symbol: "USDT_THB",
    price: "",
    amount: "",
    customer: "BTZ",
    shop_id: "2",
    amount_thb: "",
};

const NewOrderForm = () => {
    const { addNewOrderOTC } = useAddNewOrderContext();
    const [input, setInput] = useState<InputState>(initialInput);
    const [selectedSymbol, setSelectedSymbol] = useState<string>("");
    const [selectedSide, setSelectedSide] = useState<string>("");
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [selectedYouEx, setSelectedYouEx] = useState<string>();
    const [calculatedPrice, setCalculatedPrice] = useState<number | string>("");

    const token = localStorage.getItem("token") ?? "";

    useEffect(() => {
        setSelectedSymbol(input.symbol);
        setSelectedSide(input.side);
        setSelectedCustomer(input.customer);
        setSelectedYouEx(input.shop_id);

        if (
            !isNaN(parseFloat(String(input.amount_thb))) &&
            !isNaN(parseFloat(String(input.amount)))
        ) {
            setCalculatedPrice(
                (
                    parseFloat(String(input.amount_thb)) /
                    parseFloat(String(input.amount))
                ).toFixed(2)
            );
        }
    }, [
        input.symbol,
        input.side,
        input.customer,
        input.shop_id,
        input.amount_thb,
        input.amount,
    ]);

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
        if (input.price === "" || input.amount === "") {
            window.alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }

        try {
            await addNewOrderOTC(input, token);
            window.alert("เพิ่มข้อมูลเรียบร้อย");
            setInput(initialInput);
        } catch (error) {
            console.error("Error adding new order:", error);
        }
    };

    return (
        <div className=" rounded-md m-auto">
            <div className="  ">
                <div>
                    <Card className=" shadow-none border-0">
                        <CardHeader>
                            <CardTitle className="text-4xl font-extralight ">
                                Add New Order
                            </CardTitle>
                        </CardHeader>
                        <div className="flex flex-wrap">
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
                                    value={selectedSymbol}
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
                                    value={selectedSide}
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
                        <div className="flex flex-wrap">
                            <CardContent>
                                <p>Amount</p>
                                <Input
                                    className="w-[200px] placeholder:italic placeholder:text-slate-400 placeholder:text-sm"
                                    type="number"
                                    name="amount"
                                    value={input.amount}
                                    onChange={handleInputChange}
                                    placeholder="Input Amount"
                                    autoFocus
                                />
                            </CardContent>
                            <CardContent>
                                <p>Price</p>
                                <Input
                                    className="w-[140px] placeholder:italic placeholder:text-slate-400 placeholder:text-sm"
                                    type="number"
                                    name="price"
                                    value={input.price}
                                    onChange={handleInputChange}
                                    placeholder="Input Price"
                                />
                                <p
                                    className={`text-xs text-gray-400 ${
                                        calculatedPrice === 0
                                            ? "hidden"
                                            : calculatedPrice === ""
                                            ? "hidden"
                                            : ""
                                    }`}
                                >
                                    Real Price : {calculatedPrice}
                                </p>
                            </CardContent>

                            <CardContent>
                                <p>THB</p>
                                <Input
                                    className="w-[200px] placeholder:italic placeholder:text-slate-400 placeholder:text-sm"
                                    type="number"
                                    name="amount_thb"
                                    value={input.amount_thb}
                                    onChange={handleInputChange}
                                    placeholder="Input Money Received"
                                />
                            </CardContent>
                        </div>
                        <div className="flex flex-wrap">
                            <CardContent>
                                <p>Tranfer From</p>
                                <Select
                                    name="shop_id"
                                    onValueChange={(value) => {
                                        setInput({
                                            ...input,
                                            shop_id: String(value),
                                        });
                                    }}
                                    value={selectedYouEx}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2">
                                            Binance
                                        </SelectItem>
                                        <SelectItem value="4">OKX</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                            <CardContent>
                                <p>To Exchange</p>
                                <Select
                                    name="customer"
                                    onValueChange={(value) => {
                                        setInput({
                                            ...input,
                                            customer: String(value),
                                        });
                                    }}
                                    value={selectedCustomer}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BTZ">BTZ</SelectItem>
                                        <SelectItem value="Binance">
                                            Binance
                                        </SelectItem>
                                        <SelectItem value="INVX">
                                            INVX
                                        </SelectItem>
                                        <SelectItem value="OKX">OKX</SelectItem>
                                        <SelectItem value="BK">BK</SelectItem>
                                        <SelectItem value="Z">Z</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </div>
                        <div className="m-3 flex justify-center">
                            {/* <Button
                                className="bg-slate-500 w-[200px] h-[50px]"
                                type="button"
                                variant="outline"
                                onClick={handleAddOrder}
                            >
                                Add
                            </Button> */}
                            <DrawerFooter className="w-full">
                                <div className="flex justify-between  ">
                                    <Button
                                        // onClick={() => handleAddOrder()}
                                        className="min-w-[240px] w-[300px] "
                                    >
                                        Submit
                                    </Button>

                                    <DrawerClose asChild>
                                        <Button
                                            variant="outline"
                                            className="text-rose-500 hover:text-rose-700 border-rose-500"
                                        >
                                            <X className="w-6 h-6 " />
                                            Close
                                        </Button>
                                    </DrawerClose>
                                </div>
                            </DrawerFooter>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NewOrderForm;
