type HealthyStatus = {
  hostname: string;
  uptime_seconds: number;
  load_average: {
    "1min": number;
    "5min": number;
    "15min": number;
  };
  cpu_usage_percent: number;
  memory: {
    total_mb: number;
    available_mb: number;
    used_mb: number;
    percent_used: number;
  };
};

type UnhealthyStatus = {
  status: "unhealthy";
  error: string;
};

export type HealthResponse = HealthyStatus | UnhealthyStatus;

export const isHealthyStatus = (
  status: HealthResponse,
): status is HealthyStatus => {
  return "status" in status === false;
};

export type PowerAction = "poweron" | "shutdown" | "reboot" | "sleep";

export type Role = "user" | "system" | "assistant";

export type Message = {
  conversation_id?: string;
  content: string;
  role: Role;
  created_at?: string;
  id?: string;
};

export type Conversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};
