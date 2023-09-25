import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function UserProfile() {
    const { userProfileData, fetchUserProfile } = useUserProfileContext();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
        return <Navigate to="/" replace={true} />;
    };

    if (!userProfileData || userProfileData.length === 0) {
        return <div>Load...</div>;
    }
    // console.log(userProfileData);

    return (
        <div className="mr-2 mt-2 w-40">
            <div className="items-center">
                <div className="flex justify-around p-3 m-1 flex-row -space-x-1 border rounded-lg bg-white">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                        <AvatarFallback>WG</AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {userProfileData.username}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-5 mt-3 ">
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
