"use client";

import { FC, useEffect, useState } from "react";
import TrafficLight from "@/components/nav/trafficLight";
import { getPcHealth } from "@/utils/local";
import { HealthResponse } from "@/utils/types";
import HealthStatus from "./healthStatus";

interface PCContainerProps {
  initialHealth: HealthResponse | null;
}

const PCContainer: FC<PCContainerProps> = ({ initialHealth }) => {
  const [pcHealth, setPcHealth] = useState<HealthResponse | null>(
    initialHealth
  );
  const [showStatus, setShowStatus] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await getPcHealth();
        console.log("PC Health:", response);

        setPcHealth(response);
      } catch (error) {
        console.error("Error reaching PC API:", error);
      }
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
    <>
      <TrafficLight
        status={pcHealth ? "green" : "red"}
        onClick={() => {
          setShowStatus(!showStatus);
        }}
      />
      {showStatus && pcHealth && <HealthStatus pcHealth={pcHealth} />}
    </>
  );
};

export default PCContainer;
