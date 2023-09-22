import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

export default function MyRedirect({ children }: Props) {
    const token = localStorage.getItem("token") || "";
    if (!token) {
        return <>{children}</>; // ไม่มี token ให้แสดง children
    }
    return <Navigate to="/home" />;
}
