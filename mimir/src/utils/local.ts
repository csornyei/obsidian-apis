import axios from "axios";
import { HealthResponse, PowerAction } from "@/utils/types";

export const getPcHealth: () => Promise<HealthResponse> = async () => {
  const response = await axios.get("/mimir/api/pc");
  return response.data;
};

export const sendPowerCommand = async (action: PowerAction) => {
  const response = await axios.post("/mimir/api/pc", { action });
  return response.data;
};
