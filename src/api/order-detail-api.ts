import axios from "axios";
import { SERVER } from "../config/config";

export const GetOrderHistory = (page) =>
    axios.get(`${SERVER}order/orderhistory?page=${page}`);
