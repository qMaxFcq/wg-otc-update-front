import axios from "axios";
import { SERVER } from "../config/config";

export const editOrder = (id: number, input: any, token: string) =>
    axios.post(`${SERVER}order/editorder/${id}`, input, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
