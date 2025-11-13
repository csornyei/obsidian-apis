import { FC } from "react";

interface TrafficLightProps {
  status: "red" | "yellow" | "green";
  onClick: () => void;
}

const TrafficLight: FC<TrafficLightProps> = ({ status = "green", onClick }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "red":
        return "bg-red-600 border-red-700 hover:brightness-110";
      case "yellow":
        return "bg-yellow-400 border-yellow-500 hover:brightness-110";
      case "green":
      default:
        return "bg-green-600 border-green-700 hover:brightness-110";
    }
  };
  const className = `w-8 cursor-pointer h-8 rounded-full border-4 border-solid ${getBackgroundColor()}`;

  return <div onClick={onClick} className={className}></div>;
};

export default TrafficLight;
