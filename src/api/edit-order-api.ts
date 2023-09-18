import axios from "axios";
import { SERVER } from "../config/config";

export const editOrder = (id, input) =>
    axios.post(`${SERVER}order/editorder/${id}`, input);
