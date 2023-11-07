import { Navigate } from "react-router-dom";

type Props = { children: any };

export default function ProtectedRoute({ children }: Props) {
    const token = localStorage.getItem("token");
    if (token) {
        return children;
    }
    return <Navigate to="/*" />;
}
