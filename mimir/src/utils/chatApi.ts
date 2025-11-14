import axios, { AxiosError } from "axios";
import { Message } from "@/utils/types";

const url = process.env.CHAT_API_URL || "http://localhost:5000";
const apiKey = process.env.CHAT_API_KEY;

const chatApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export const sendMessage = async (
  chatId: string,
  message: Message,
): Promise<Message | null> => {
  console.log(`Sending message: ${message}`);
  try {
    const response = await chatApi.post("/message", {
      chatId,
      message,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        responseData: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getChatHistory = async (
  chatId: string,
): Promise<Message[] | null> => {
  try {
    const response = await chatApi.get(`/history/${chatId}`);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        responseData: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export const getChatList = async (): Promise<string[] | null> => {
  try {
    const response = await chatApi.get("/chats");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        responseData: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
