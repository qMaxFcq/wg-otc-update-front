import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, Navigate } from "react-router-dom";

export default function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
        return <Navigate to="/" replace={true} />;
    };

    return (
        <div className="flex flex-col justify-between bg-slate-800 text-white h-screen p-3 w-64">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className=" text-2xl">OTC Record</p>
            </div>
            <div className=" flex flex-col text-xl items-center">
                <Link to="/home">
                    <button className="hover:bg-slate-700 rounded-sm">
                        Add New OTC
                    </button>
                </Link>
                <Link to="/history">
                    <button className="hover:bg-slate-700 rounded-sm">
                        History
                    </button>
                </Link>
                {/* เรียกใช้ฟังก์ชัน handleLogout เมื่อคลิกที่ปุ่ม "Logout" */}
                <button
                    onClick={handleLogout}
                    className="hover:bg-slate-700 rounded-sm"
                >
                    Logout
                </button>
            </div>
            <div className="items-center">Alpha 1.0</div>
        </div>
    );
}
