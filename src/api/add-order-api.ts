import axios from "axios";
import { SERVER } from "../config/config";

export const addNewOrderToDB = (input: any, token: string) =>
    axios.put(`${SERVER}order/addorder`, input, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
