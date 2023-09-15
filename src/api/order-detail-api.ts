import axios from "axios";
import { SERVER } from "../config/config";

export const GetOrderHistory = () => axios.get(`${SERVER}order/orderhistory`);
