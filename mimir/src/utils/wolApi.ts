import axios, { AxiosError } from "axios";
import { HealthResponse, PowerAction } from "./types";

const url = process.env.WOL_API || "http://localhost:8000";
const secretKey = process.env.WOL_API_KEY;

const wolApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHealth: () => Promise<HealthResponse | null> = async () => {
  try {
    const response = await wolApi.get("/health");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export const postPowerAction = async (action: PowerAction) => {
  if (action === "poweron") {
    throw new Error("Power on action is not supported via this method");
  }

  console.log(`Sending power action: ${action}`);
  try {
    const response = await wolApi.post(`/power/${action}`, {
      secret_key: secretKey,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export default wolApi;
