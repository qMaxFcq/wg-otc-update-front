import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
    return (
        <div className="bg-gray-800 text-white h-screen w-64">
            <div className="flex flex-col  ">
                <div className="flex justify-center mt-3 items-center gap-2  p-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className=" text-2xl">OTC Record</p>
                </div>
                <div className=" flex flex-col gap-6 mt-10 p-5 text-xl">
                    <button className="hover:bg-slate-700 rounded-sm">Add New OTC</button>
                    <button className="hover:bg-slate-700 rounded-sm">History</button>
                </div>
            </div>
        </div>
    );
}
