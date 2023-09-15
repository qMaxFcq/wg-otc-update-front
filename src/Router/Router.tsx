import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/Page/HomePage";
import HistoryPage from "@/Page/HistoryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/history",
        element: <HistoryPage />,
    },
]);
export default function Router() {
    return <RouterProvider router={router} />;
}
