import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarItem = () => {
    return (
        <>
            <ul className="space-y-2">
                <li className="flex items-center  ">
                    <Link to="/home">
                        <button className="hover:bg-slate-700  rounded-md w-56 p-2  flex items-center space-x-2">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/011/064/650/non_2x/cryptocurrency-3d-illustration-free-png.png"
                                alt="Add New OTC"
                                className="w-12 h-w-12"
                            />
                            Add New OTC
                        </button>
                    </Link>
                </li>
                <li className="flex items-center ">
                    <Link to="/history">
                        <button className="hover:bg-slate-700  rounded-md w-56 p-2  flex items-center space-x-2">
                            <img
                                src="https://images.ctfassets.net/c5bd0wqjc7v0/5o0IbUnXunFKmiSC31gK6j/c9da092eda3ebc34941dfa3d107437f4/Type_Circles_4x.png?fl=progressive&q=100&w=560"
                                alt="History"
                                className="w-12 h-w-12"
                            />
                            History
                        </button>
                    </Link>
                </li>
            </ul>
        </>
    );
};

const LogoIcon = () => (
    <div className="flex items-center gap-3 my-4 mb-8 justify-center">
        {" "}
        <Avatar className="w-14 h-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-2xl">OTC Record</p>
    </div>
);

export default function Navbar() {
    return (
        <div className="flex flex-col bg-slate-800 text-white h-screen p-4 ">
            <aside className="w-64 max-md:hidden">
                <LogoIcon />
                <NavbarItem />
            </aside>
            <Sheet>
                <SheetTrigger className="md:hidden">
                    <MenuIcon size={20} />
                </SheetTrigger>
                <SheetContent
                    side={"left"}
                    className="w-[304px] sm:w-[540px] bg-slate-800 text-white "
                >
                    <SheetHeader>
                        <div className="flex items-center gap-3 my-4 mb-8 justify-center">
                            <Avatar className="w-14 h-14">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-2xl">OTC Record</p>
                        </div>
                    </SheetHeader>
                    <NavbarItem />
                </SheetContent>
            </Sheet>
        </div>
    );
}
