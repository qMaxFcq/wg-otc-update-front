import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = { children: any };

export default function ProtectedRoute({ children }: Props) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || token === undefined) {
            localStorage.removeItem("token");
            navigate("/");
        }
    }, [navigate]);
    return children;
}
