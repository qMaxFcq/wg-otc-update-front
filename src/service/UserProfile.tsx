import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileContext } from "@/context/userContext";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import WithdrawDepositCoin from "@/components/custom/components_for_wid_depo/WithdrawDepositCoin";

export default function UserProfile() {
    const { userProfileData, fetchUserProfile } = useUserProfileContext();
    const navigate = useNavigate();
    const token = localStorage.getItem("token") ?? "";

    useEffect(() => {
        fetchUserProfile(token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
      };

    if (!userProfileData) {
        return <div>Load...</div>;
    }
    // console.log(userProfileData);

    return (
        <div className="w-60     ">
            <div className="flex justify-end w-auto items-start">
                <div className="flex justify-around w-40 p-3 m-1 -space-x-1 border  rounded-lg bg-white">
                    <DropdownMenu>
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                            <AvatarFallback>WG</AvatarFallback>
                        </Avatar>
                        <DropdownMenuTrigger>
                            <p>{userProfileData.username}</p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-1 mt-3 w-40">
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
