import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

export default function AddOrderPage() {
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
                                <Select>
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
                                <Select>
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
                                <Input className="w-[140px]" />
                            </CardContent>
                            <CardContent>
                                <p>Amount</p>
                                <Input className="w-[200px]" />
                            </CardContent>
                        </div>
                        <CardContent>
                            <p>Customer</p>
                            <Select>
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
                                variant="outline"
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
