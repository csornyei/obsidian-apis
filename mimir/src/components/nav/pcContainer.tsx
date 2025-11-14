"use client";

import { FC, useEffect, useState } from "react";
import TrafficLight from "@/components/nav/trafficLight";
import { getPcHealth, sendPowerCommand } from "@/utils/local";
import { HealthResponse } from "@/utils/types";
import HealthStatus from "./healthStatus";
import { AxiosError } from "axios";
import { Power } from "lucide-react";

const PCContainer: FC = () => {
  const [pcHealth, setPcHealth] = useState<HealthResponse | null>(null);
  const [showStatus, setShowStatus] = useState<boolean>(false);

  useEffect(() => {
    const getHealth = async () => {
      try {
        const response = await getPcHealth();
        console.log("Initial PC Health:", response);

        setPcHealth(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Axios error details:", {
            message: (error as AxiosError).response?.data,
            code: (error as AxiosError).code,
          });
        } else {
          console.error("Error reaching PC API:", error);
        }
        setPcHealth(null);
      }
    };

    (async () => {
      await getHealth();
    })();

    const interval = setInterval(async () => {
      await getHealth();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showStatus) {
      const interval = setInterval(async () => {
        setShowStatus(false);
      }, 30000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showStatus]);

  return (
    <div className="flex flex-row gap-2 items-center">
      {!pcHealth && (
        <Power
          className="text-green-700 bg-green-100 p-1 rounded-full w-8 h-8 cursor-pointer active:bg-green-900 active:text-green-200"
          onClick={async () => {
            const response = await sendPowerCommand("poweron");
            console.log("Power on response:", response);
          }} />
      )}
      <TrafficLight
        status={pcHealth ? "green" : "red"}
        onClick={() => {
          setShowStatus(!showStatus);
        }}
      />
      {showStatus && pcHealth && <HealthStatus pcHealth={pcHealth} />}
    </div>
  );
};

export default PCContainer;
