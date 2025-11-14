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
    <div className="mt-3 flex justify-between">
      <button
        onClick={restart}
        className="cursor-pointer rounded bg-blue-600 px-3 py-1 text-white"
      >
        <RotateCcw />
      </button>
      <button
        onClick={sleep}
        className="cursor-pointer rounded bg-yellow-600 px-3 py-1 text-white"
      >
        <EyeClosed />
      </button>
      <button
        onClick={shutdown}
        className="cursor-pointer rounded bg-red-600 px-3 py-1 text-white"
      >
        <Power />
      </button>
    </div>
  );
}
