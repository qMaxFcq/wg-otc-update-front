import React from "react";
import Navbar from "@/service/Navbar";
import History from "../components/custom/History";
import UserProfile from "@/service/UserProfile";
import WithdrawDepositCoin from "@/components/custom/components_for_wid_depo/WithdrawDepositCoin";

const HistoryPage: React.FC = () => {
    return (
        <div className="flex">
            <Navbar />
            <div className="w-full flex-col mx-8">
                <WithdrawDepositCoin />
                <History />
            </div>

            <UserProfile />
        </div>
    );
};

export default HistoryPage;
