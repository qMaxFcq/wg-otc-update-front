import axios from "axios";
import { SERVER } from "../config/config";

export const login = (loginData: any) =>
    axios.post(`${SERVER}login`, loginData);
