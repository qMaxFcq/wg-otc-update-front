import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AddNewOrderContextProvider } from "./context/addNewOrderContext.tsx";
import { GetOrderContextProvider } from "./context/getOrderHistoryContext.tsx";
import { LoginContextProvider } from "./context/loginContext.tsx";
import { UserProfileContextProvider } from "./context/userContext.tsx";
import "@/App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <LoginContextProvider>
        <UserProfileContextProvider>
            <AddNewOrderContextProvider>
                <GetOrderContextProvider>
                    <App />
                </GetOrderContextProvider>
            </AddNewOrderContextProvider>
        </UserProfileContextProvider>
    </LoginContextProvider>
    // </React.StrictMode>
);
