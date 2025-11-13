import { FC } from "react";
import { HealthResponse } from "@/utils/types";
import ControlButtons from "./controlButtons";

interface HealthStatusProps {
  pcHealth: HealthResponse;
}

const parseUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  if (days > 0) {
    return `${days}d ${hours}:${minutes}:${secs}`;
  }

  return `${hours}:${minutes}:${secs}`;
};

const mbToGb = (mb: number): string => {
  return (mb / 1024).toFixed(2);
};

const HealthStatus: FC<HealthStatusProps> = ({ pcHealth }) => {
  return (
    <div className="absolute top-12 right-2 bg-zinc-700 text-white p-2 rounded">
      <div className="flex justify-between mb-1">
        <span>Hostname:</span>
        <span>{pcHealth.hostname}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span>Uptime:</span>
        <span>{parseUptime(pcHealth.uptime_seconds)}</span>
      </div>

      <p>Load Average:</p>
      <table className="table-auto mb-1 w-full">
        <thead>
          <tr>
            <th className="px-2 text-center">1 min</th>
            <th className="px-2 text-center">5 min</th>
            <th className="px-2 text-center">15 min</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 text-center">
              {pcHealth.load_average["1min"].toFixed(2)}
            </td>
            <td className="px-2 text-center">
              {pcHealth.load_average["5min"].toFixed(2)}
            </td>
            <td className="px-2 text-center">
              {pcHealth.load_average["15min"].toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between mb-1">
        <span>CPU Usage:</span>
        <span>{pcHealth.cpu_usage_percent.toFixed(2)}%</span>
      </div>
      <div>
        <p>Memory Usage:</p>
        <p>
          {pcHealth.memory.percent_used.toFixed(2)}% (
          {mbToGb(pcHealth.memory.used_mb)}
          GB / {mbToGb(pcHealth.memory.total_mb)}GB)
        </p>
      </div>
      <ControlButtons />
    </div>
  );
};

export default HealthStatus;
