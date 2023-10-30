import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = { children: React.ReactNode };

export default function Redirect({ children }: Props) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || token === undefined) {
            localStorage.removeItem("token");
        } else {
            navigate("/home");
        }
    }, [token, navigate]);

    return children;
}
