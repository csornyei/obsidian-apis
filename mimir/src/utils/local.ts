import axios from "axios";
import { HealthResponse, PowerAction } from "@/utils/types";

const localAxios = axios.create({
  baseURL: "/mimir/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPcHealth: () => Promise<HealthResponse> = async () => {
  const response = await localAxios.get("/pc");
  return response.data;
};

export const sendPowerCommand = async (action: PowerAction) => {
  console.log(`Sending power command: ${action} to /mimir/api/pc`);

  const response = await localAxios.post("/pc", { action });

  console.log(`Power command response:`, response.data);
  return response.data;
};

export const getChatMessages = async (chatId: string) => {
  const response = await localAxios.get(`/chat/${chatId}`);
  return response.data;
};

export const listChats = async () => {
  const response = await localAxios.get("/chat");
  return response.data;
};

export const sendChatMessage = async (
  chatId: string | null,
  message: string,
) => {
  console.log(`Sending message to chat ${chatId}: ${message}`);

  const response = await localAxios.post(`/chat`, { message, chatId });

  console.log(`Chat message response:`, response.data);
  return response.data;
};
