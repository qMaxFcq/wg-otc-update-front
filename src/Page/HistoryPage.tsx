import React from "react";
import Navbar from "@/service/Navbar";
import History from "../components/custom/History";

const HistoryPage: React.FC = () => {
    return (
        <div className="flex ">
            <Navbar />
            <History />
        </div>
    );
};

export default HistoryPage;
