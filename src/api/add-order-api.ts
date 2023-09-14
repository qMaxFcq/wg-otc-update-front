import axios from "axios";
import { SERVER } from "../config/config";

export const addNewOrderToDB = () => axios.put(`${SERVER}order/addorder`);
