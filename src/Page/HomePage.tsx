import React from "react";
import Navbar from "@/service/Navbar";
import AddOrderPage from "../components/custom/AddOrderPage";
import UserProfile from "@/service/UserProfile";

const HomePage: React.FC = () => {
    return (
        <div className="flex bg-gradient-to-r from-indigo-500">
            <Navbar />
            <AddOrderPage />
            <UserProfile />
            {/* <History /> */}
        </div>
    );
};

export default HomePage;
