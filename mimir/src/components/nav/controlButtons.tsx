import { EyeClosed, Power, RotateCcw } from "lucide-react";
import { sendPowerCommand } from "@/utils/local";

export default function ControlButtons() {
  const restart = () => {
    sendPowerCommand("reboot");
  };

  const sleep = () => {
    sendPowerCommand("sleep");
  };

  const shutdown = () => {
    sendPowerCommand("shutdown");
  };

  return (
    <div className="flex justify-between mt-3">
      <button
        onClick={restart}
        className="px-3 py-1 cursor-pointer bg-blue-600 text-white rounded"
      >
        <RotateCcw />
      </button>
      <button
        onClick={sleep}
        className="px-3 py-1 cursor-pointer bg-yellow-600 text-white rounded"
      >
        <EyeClosed />
      </button>
      <button
        onClick={shutdown}
        className="px-3 py-1 cursor-pointer bg-red-600 text-white rounded"
      >
        <Power />
      </button>
    </div>
  );
}
