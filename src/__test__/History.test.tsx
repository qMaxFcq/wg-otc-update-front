import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import History from "../components/custom/History";
import { useGetOrderContext } from "@/context/getOrderHistoryContext";
import { useAddNewOrderContext } from "@/context/addNewOrderContext";

jest.mock("@/context/getOrderHistoryContext");
jest.mock("@/context/addNewOrderContext");

describe("History", () => {
    beforeEach(() => {
        (useGetOrderContext as jest.Mock).mockReturnValue({
            orderHistory: {
                data: [
                    {
                        id: 1,
                        symbol: "BTC",
                        price: 50000,
                        amount: 1,
                        cost: 50000,
                        customer: "BTZ",
                        side: "BUY",
                        shop_id: 2,
                    },
                    {
                        id: 2,
                        symbol: "ETH",
                        price: 3000,
                        amount: 2,
                        cost: 6000,
                        customer: "INVX",
                        side: "SELL",
                        shop_id: 4,
                    },
                ],
            },
            fetchOrderOTC: jest.fn(),
        });

        (useAddNewOrderContext as jest.Mock).mockReturnValue({
            editOrderOTC: jest.fn(),
        });
    });

    test("renders order history table", () => {
        render(
            <BrowserRouter>
                <History />
            </BrowserRouter>
        );

        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();

        const tableRows = screen.getAllByRole("row");
        expect(tableRows.length).toBe(3); // Including table header

        const tableHeaders = screen.getAllByRole("columnheader");
        expect(tableHeaders.length).toBe(9);

        const editButtons = screen.getAllByText("Edit");
        expect(editButtons.length).toBe(2);
    });

    test("displays loading spinner when order history is not available", () => {
        (useGetOrderContext as jest.Mock).mockReturnValue({
            orderHistory: null,
            fetchOrderOTC: jest.fn(),
        });

        render(
            <BrowserRouter>
                <History />
            </BrowserRouter>
        );

        const loadingSpinner = screen.getByRole("progressbar");
        expect(loadingSpinner).toBeInTheDocument();
    });

    test("calls fetchOrderOTC when next page button is clicked", () => {
        const fetchOrderOTC = jest.fn();
        (useGetOrderContext as jest.Mock).mockReturnValue({
            orderHistory: {
                data: [
                    {
                        id: 1,
                        symbol: "BTC",
                        price: 50000,
                        amount: 1,
                        cost: 50000,
                        customer: "BTZ",
                        side: "BUY",
                        shop_id: 2,
                    },
                ],
            },
            fetchOrderOTC,
        });

        render(
            <BrowserRouter>
                <History />
            </BrowserRouter>
        );

        const nextPageButton = screen.getByText("Next");
        fireEvent.click(nextPageButton);

        expect(fetchOrderOTC).toHaveBeenCalledTimes(1);
    });

    test("calls fetchOrderOTC when previous page button is clicked", () => {
        const fetchOrderOTC = jest.fn();
        (useGetOrderContext as jest.Mock).mockReturnValue({
            orderHistory: {
                data: [
                    {
                        id: 1,
                        symbol: "BTC",
                        price: 50000,
                        amount: 1,
                        cost: 50000,
                        customer: "BTZ",
                        side: "BUY",
                        shop_id: 2,
                    },
                ],
            },
            fetchOrderOTC,
        });

        render(
            <BrowserRouter>
                <History />
            </BrowserRouter>
        );

        const prevPageButton = screen.getByText("Previous");
        fireEvent.click(prevPageButton);

        expect(fetchOrderOTC).toHaveBeenCalledTimes(1);
    });

    test("calls editOrderOTC when edit button is clicked", () => {
        const editOrderOTC = jest.fn();
        (useAddNewOrderContext as jest.Mock).mockReturnValue({
            editOrderOTC,
        });

        render(
            <BrowserRouter>
                <History />
            </BrowserRouter>
        );

        const editButtons = screen.getAllByText("Edit");
        fireEvent.click(editButtons[0]);

        expect(editOrderOTC).toHaveBeenCalledTimes(1);
        expect(editOrderOTC).toHaveBeenCalledWith(
            1,
            {
                id: 1,
                symbol: "BTC",
                side: "BUY",
                price: 50000,
                amount: 1,
                customer: "BTZ",
                shop_id: 2,
            },
            ""
        );
    });
});
