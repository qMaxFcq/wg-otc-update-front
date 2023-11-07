import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useLoginContext } from "@/context/loginContext";

type Props = {};

export default function LoginPage({}: Props) {
    const { userLogin } = useLoginContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            window.alert("Email and Password are required");
            return;
        }

        const loginData = {
            email: email,
            password: password,
        };

        // console.log(loginData);
        setIsLoading(true);
        try {
            const response = await userLogin(loginData);
            if (response.status === 200) {
                setIsLoading(false);
                window.location.reload();
            } else {
                window.alert("Email or Password Wrong");
                setIsLoading(true);
                window.location.reload();
            }
        } catch (error) {
            setIsLoading(false);
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 ">
            {isLoading && (
                <div className="absolute top-56 right-[620px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            )}
            <Card className="w-[350px] ">
                <CardHeader>
                    <CardTitle>Login Page</CardTitle>
                    <CardDescription>จะเข้าไปก็ login ก่อนนะ</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Your password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button className="w-[300px]" type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
