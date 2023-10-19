import axios from "axios";
import { SERVER } from "../config/config";

export const GetOrderHistory = ({ currentPage, formattedDate, token }) => {
    const queryString = formattedDate
        ? `page=${currentPage}&selectedDate=${formattedDate}`
        : `page=${currentPage}`;

    return axios.get(`${SERVER}order/orderhistory?${queryString}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// export const GetWithdrawDepositAllCoin = ({ formattedDate, token }) => {
//     const queryString = `selectedDate=${formattedDate || ""}`;
//     return axios.get(
//         `${SERVER}order/historywithdrawanddeposit?${queryString}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
// };
