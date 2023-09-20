import axios from "axios";
import { SERVER } from "../config/config";

export const GetOrderHistory = ({ currentPage, formattedDate }) => {
    // สร้าง query string ใน URL โดยรวม formattedDate (ถ้ามี) ในคำขอ
    console.log(currentPage);
    const queryString = formattedDate
        ? `page=${currentPage}&selectedDate=${formattedDate}`
        : `page=${currentPage}`;

    return axios.get(`${SERVER}order/orderhistory?${queryString}`);
};
