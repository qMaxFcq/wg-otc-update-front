import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileContext } from "@/context/userContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import WithdrawDepositCoin from "@/components/custom/components_for_wid_depo/WithdrawDepositCoin";

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
        <div className="w-60 border-2 ">
            <div className="flex justify-end w-auto items-start">
                <div className="flex justify-around w-32 p-3 m-1 -space-x-1 border  rounded-lg bg-white">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                        <AvatarFallback>WG</AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {userProfileData.username}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-1 mt-3 ">
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div>
                <WithdrawDepositCoin />
            </div>
        </div>
    );
}
