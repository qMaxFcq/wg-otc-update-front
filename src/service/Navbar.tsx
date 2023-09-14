import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
    return (
        <div className="flex flex-col justify-between bg-gray-800 text-white h-screen p-3 w-64">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className=" text-2xl">OTC Record</p>
            </div>
            <div className=" flex flex-col text-xl">
                <button className="hover:bg-slate-700 rounded-sm">
                    Add New OTC
                </button>
                <button className="hover:bg-slate-700 rounded-sm">
                    History
                </button>
            </div>
            <div className="items-center">Alpha 1.0</div>
        </div>
    );
}
