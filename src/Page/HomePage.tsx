import React from "react";
import Navbar from "@/service/Navbar";
import AddOrderPage from "../components/custom/AddOrderPage";

const HomePage: React.FC = () => {
    return (
        <div className="flex bg-gradient-to-r from-indigo-500">
            <Navbar />
            <AddOrderPage />
            {/* <History /> */}
        </div>
    );
};

export default HomePage;
