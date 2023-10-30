import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = { children: React.ReactNode };

export default function Redirect({ children }: Props) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token && token !== undefined) {
            // ถ้ามี Token ให้นำทางไปยังหน้าหลัก ("/home")
            navigate("/home");
        } else {
            // ถ้าไม่มี Token ให้นำทางไปยังหน้า Login หรือหน้าที่ใช้ในการล็อกอิน
            navigate("/login"); // แก้ไขเส้นทางตามที่คุณต้องการ
        }
    }, [token, navigate]);

    return children;
}
