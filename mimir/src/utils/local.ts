import axios from "axios";
import { HealthResponse, PowerAction } from "@/utils/types";

export const getPcHealth: () => Promise<HealthResponse> = async () => {
  const response = await axios.get("/mimir/api/pc");
  return response.data;
};

export const sendPowerCommand = async (action: PowerAction) => {
  console.log(`Sending power command: ${action} to /mimir/api/pc`);

  const response = await axios.post("/mimir/api/pc", { action });

  console.log(`Power command response:`, response.data);
  return response.data;
};
