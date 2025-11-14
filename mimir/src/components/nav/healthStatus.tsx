import { FC } from "react";
import { HealthResponse, isHealthyStatus } from "@/utils/types";
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
  if (isHealthyStatus(pcHealth)) {
    return (
      <div className="absolute top-12 right-2 rounded bg-zinc-700 p-2 text-white">
        <div className="mb-1 flex justify-between">
          <span>Hostname:</span>
          <span>{pcHealth.hostname}</span>
        </div>
        <div className="mb-1 flex justify-between">
          <span>Uptime:</span>
          <span>{parseUptime(pcHealth.uptime_seconds)}</span>
        </div>

        <p>Load Average:</p>
        <table className="mb-1 w-full table-auto">
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

        <div className="mb-1 flex justify-between">
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
  } else {
    // This should never happen, but just in case
    return (
      <div className="absolute top-12 right-2 rounded bg-red-700 p-2 text-white">
        <p>PC is Unhealthy</p>
        <p>Error: {pcHealth.error}</p>
      </div>
    );
  }
};

export default HealthStatus;
