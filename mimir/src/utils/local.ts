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
  const response = await fetch(`/mimir/api/chat/${chatId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Error fetching chat messages: ${response.statusText}`);
  }
  return response.json();
};

export const listChats = async () => {
  const response = await fetch("/mimir/api/chat", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Error fetching chat list: ${response.statusText}`);
  }
  return response.json();
};

export const sendChatMessage = async (message: Message): Promise<Message> => {
  const response = await localAxios.post("/chat", message);
  return response.data;
};
