import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AddNewOrderContextProvider } from "./context/addNewOrderContext.tsx";
import { GetOrderContextProvider } from "./context/getOrderHistoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <AddNewOrderContextProvider>
        <GetOrderContextProvider>
            <App />
        </GetOrderContextProvider>
    </AddNewOrderContextProvider>
    // </React.StrictMode>
);
