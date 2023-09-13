import React from "react";
import Navbar from "@/service/Navbar";
import AddOrderPage from "./AddOrderPage";
import History from "./History";

const HomePage: React.FC = () => {
    return (
        <div className="flex bg-slate-900">
            <Navbar />
            {/* <AddOrderPage /> */}
            <History />
        </div>
    );
};

export default HomePage;
