import axios, { AxiosError } from "axios";
import { Conversation, Message } from "@/utils/types";

const url = process.env.CHAT_API_URL || "http://localhost:5000";
// TODO: add to mimir-orchestator
// const apiKey = process.env.CHAT_API_KEY;

const chatApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${apiKey}`,
  },
});

export const sendMessage = async (
  conversation_id: string | null,
  message: Message,
): Promise<Message | null> => {
  console.log(`Sending message: ${message}`);
  try {
    const response = await chatApi.post("/chat", {
      conversation_id,
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

export const getChatHistory = async (chatId: string): Promise<Message[]> => {
  try {
    const response = await chatApi.get<Message[]>(`/conversations/${chatId}`);

    const data = response.data;

    if (!data || data.length === 0) {
      return [];
    }

    return data;
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
    return [];
  }
};

export const getConversationList = async (): Promise<Conversation[]> => {
  try {
    const response = await chatApi.get<Conversation[]>("/conversations");

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
    return [];
  }
};
