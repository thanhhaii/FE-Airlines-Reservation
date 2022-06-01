import axios from "axios";
import { BASE_URL } from "../configs";
import { APIService } from "./APIService";

const apiService = new APIService(
    axios.create({
        timeout: 5000,
        baseURL: BASE_URL
    })
)

export default apiService