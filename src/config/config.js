import axios from "axios";

// export const API_URL = "http://ec2-13-235-67-163.ap-south-1.compute.amazonaws.com:3000";
export const API_URL = "http://ec2-13-201-99-74.ap-south-1.compute.amazonaws.com:3000";

export const Axios = axios.create({
    baseURL: API_URL,
});
