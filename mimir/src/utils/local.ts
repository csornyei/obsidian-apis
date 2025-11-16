import axios from "axios";
import { HealthResponse, Message, PowerAction } from "@/utils/types";

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
  const response = await localAxios.post("/pc", { action });

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

export const sendChatMessage = async (message: Message): Promise<Message> => {
  const response = await localAxios.post(`/chat`, {
    message,
  });

  if (!response.data) {
    throw new Error("No response data received from sendChatMessage");
  }

  return response.data;
};
