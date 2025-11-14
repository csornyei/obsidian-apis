"use client";

import { FC, useEffect, useRef, useState } from "react";
import TrafficLight from "@/components/nav/trafficLight";
import { getPcHealth } from "@/utils/local";
import { HealthResponse } from "@/utils/types";
import HealthStatus from "./healthStatus";
import { AxiosError } from "axios";
import PowerButton from "./powerButton";

const PCContainer: FC = () => {
  const cooldownRef = useRef<NodeJS.Timeout | null>(null);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);

  const [pcHealth, setPcHealth] = useState<HealthResponse | null>(null);
  const [showStatus, setShowStatus] = useState<boolean>(false);

  useEffect(() => {
    const getHealth = async () => {
      try {
        const response = await getPcHealth();

        setPcHealth(response);
        setIsCoolingDown(false);
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
    if (pcHealth && cooldownRef.current) {
      clearTimeout(cooldownRef.current);
      cooldownRef.current = null;
    }
  }, [pcHealth]);

  useEffect(() => {
    if (showStatus) {
      // Auto-hide after 30 seconds
      const interval = setInterval(async () => {
        setShowStatus(false);
      }, 30000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showStatus]);

  const getStatusColor = () => {
    if (isCoolingDown) return "yellow";
    if (pcHealth) return "green";
    return "red";
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {!!pcHealth ? null : (
        <PowerButton
          cooldownRef={cooldownRef}
          isCoolingDown={isCoolingDown}
          setIsCoolingDown={setIsCoolingDown}
        />
      )}
      <TrafficLight
        status={getStatusColor()}
        onClick={() => {
          setShowStatus(!showStatus);
        }}
      />
      {showStatus && pcHealth && <HealthStatus pcHealth={pcHealth} />}
    </div>
  );
};

export default PCContainer;
