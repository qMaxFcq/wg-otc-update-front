import axios from "axios";
import { SERVER } from "../config/config";

const token = localStorage.getItem("token");
export const userProfile = () =>
    axios.get(`${SERVER}userprofile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
