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
  message: Message,
): Promise<Message | null> => {
  console.log(`Chat API: Sending message: ${message}`);
  try {
    const payload = {
      role: message.role,
      content: message.content,
      conversation_id: message.conversation_id,
    };
    console.log(`Chat API: Payload: ${JSON.stringify(payload)}`);
    const response = await chatApi.post("/chat", payload);

    console.log(`Chat API: Response data: ${JSON.stringify(response.data)}`);

    const rspData = response.data;

    if (!rspData || !rspData.response) {
      console.error("Invalid response data:", rspData);
      return null;
    }

    const responseMessage: Message = {
      conversation_id: rspData.conversation_id,
      role: rspData.response.role,
      content: rspData.response.content,
    };

    return responseMessage;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        responseData: JSON.stringify(error.response?.data),
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
    const response = await fetch(`${url}/conversations`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(
      `Chat API: getConversationList response status: ${response.status}`,
    );

    const data = await response.json();

    if (!data || data.length === 0) {
      return [];
    }

    console.log(`Chat API: getConversationList data: ${JSON.stringify(data)}`);

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
