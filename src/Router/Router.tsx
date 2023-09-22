import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/Page/HomePage";
import HistoryPage from "@/Page/HistoryPage";
import LoginPage from "@/Page/LoginPage";
import Redirect from "@/components/custom/Redirect";
import ProtectedRoute from "@/components/custom/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Redirect>
                <LoginPage />
            </Redirect>
        ),
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/history",
        element: (
            <ProtectedRoute>
                <HistoryPage />
            </ProtectedRoute>
        ),
    },
]);
export default function Router() {
    return <RouterProvider router={router} />;
}
