import React from "react";
import Navbar from "@/service/Navbar";
import History from "../components/custom/History";
import UserProfile from "@/service/UserProfile";

const HistoryPage: React.FC = () => {
    return (
        <div className="flex bg-gradient-to-r from-indigo-500">
            <Navbar />
            <History />
            <UserProfile />
        </div>
    );
};

export default HistoryPage;
