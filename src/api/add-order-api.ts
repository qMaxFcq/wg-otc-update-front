import axios from "axios";
import { SERVER } from "../config/config";

export const addNewOrderToDB = (input) =>
    axios.put(`${SERVER}order/addorder`, input);
