import axios from "axios";
import { SERVER } from "../config/config";

export const GetOrderHistory = ({
  currentPage,
  formattedDate,
  token,
}: {
  currentPage: number;
  formattedDate: string;
  token: string;
}) => {
  const queryString = formattedDate
    ? `page=${currentPage}&selectedDate=${formattedDate}`
    : `page=${currentPage}`;

  return axios.get(`${SERVER}order/orderhistory?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
