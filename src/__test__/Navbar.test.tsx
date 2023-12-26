import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Navbar from "../service/Navbar";

describe("Navbar", () => {
    test("renders Add New OTC button", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const addNewOtcButton = screen.getByText("Add New OTC");
        expect(addNewOtcButton).toBeInTheDocument();
    });

    test("renders History button", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const historyButton = screen.getByText("History");
        expect(historyButton).toBeInTheDocument();
    });

    test("renders OTC Record logo", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const otcRecordLogo = screen.getByText("OTC Record");
        expect(otcRecordLogo).toBeInTheDocument();
    });
});
