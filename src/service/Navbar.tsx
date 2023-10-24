import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex flex-col bg-slate-800 text-white h-screen p-3 w-64">
            <div className="flex items-center gap-3 mb-28">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-2xl">OTC Record</p>
            </div>
            <div className="flex flex-col text-xl items-center space-y-5">
                <Link to="/home">
                    <button className="hover:bg-slate-700 rounded-sm w-56 h-10 flex items-center space-x-2">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/011/064/650/non_2x/cryptocurrency-3d-illustration-free-png.png"
                            alt="Add New OTC"
                            className="w-12 h-w-12"
                        />
                        Add New OTC
                    </button>
                </Link>
                <Link to="/history">
                    <button className="hover:bg-slate-700 rounded-sm w-56 h-10 flex items-center space-x-2">
                        <img
                            src="https://images.ctfassets.net/c5bd0wqjc7v0/5o0IbUnXunFKmiSC31gK6j/c9da092eda3ebc34941dfa3d107437f4/Type_Circles_4x.png?fl=progressive&q=100&w=560"
                            alt="History"
                            className="w-12 h-w-12"
                        />
                        History
                    </button>
                </Link>
            </div>
        </div>
    );
}
