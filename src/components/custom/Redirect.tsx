import { Navigate } from "react-router-dom";

type Props = { children: any };

export default function Redirect({ children }: Props) {
    const token = localStorage.getItem("token");
    if (!token || token === undefined) {
        localStorage.removeItem("token");
        return children;
    }
    return <Navigate to="/home" />;
}
