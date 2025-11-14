"use client";

import { sendPowerCommand } from "@/utils/local";
import { Loader2, Power } from "lucide-react";
import { RefObject } from "react";

interface PowerButtonProps {
  cooldownRef: RefObject<NodeJS.Timeout | null>;
  isCoolingDown: boolean;
  setIsCoolingDown: (value: boolean) => void;
}

export default function PowerButton({
  cooldownRef,
  isCoolingDown,
  setIsCoolingDown,
}: PowerButtonProps) {
  return (
    <button
      className={`h-8 w-8 rounded-full bg-green-100 p-1 text-green-700 ${
        isCoolingDown
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer active:bg-green-900 active:text-green-200"
      }`}
      title="Power On PC"
      onClick={async () => {
        if (isCoolingDown) return;

        setIsCoolingDown(true);
        try {
          cooldownRef.current = setTimeout(() => {
            setIsCoolingDown(false);
          }, 5000); // 5 seconds cooldown

          const response = await sendPowerCommand("poweron");
          console.log("Power on response:", response);
        } catch (error) {
          console.error("Error sending power command:", error);
          if (cooldownRef.current) {
            clearTimeout(cooldownRef.current);
          }
          setIsCoolingDown(false);
        }
      }}
      disabled={isCoolingDown}
    >
      {isCoolingDown ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Power className="" />
      )}
    </button>
  );
}
