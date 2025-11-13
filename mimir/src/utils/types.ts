export interface HealthResponse {
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
}

export type PowerAction = "poweron" | "shutdown" | "reboot" | "sleep";
