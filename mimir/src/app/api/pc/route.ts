import { getHealth, postPowerAction } from "@/utils/wolApi";
import { PowerAction } from "@/utils/types";

export async function GET() {
  const healthResponse = await getHealth();

  if (!!healthResponse) {
    console.log("Health response received:", healthResponse);

    if ("status" in healthResponse && healthResponse.status === "unhealthy") {
      console.error("Unhealthy status received:", healthResponse.error);

      return new Response(JSON.stringify({ status: healthResponse.status }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify(healthResponse), { status: 200 });
  }
  console.error("No health response received");
  return new Response("Failed to retrieve health status", { status: 500 });
}

type PostBody = {
  action: PowerAction;
};

export async function POST(req: Request) {
  const body: PostBody = await req.json();

  const { action } = body;

  switch (action) {
    case "reboot":
    case "sleep":
    case "shutdown":
      const response = await postPowerAction(action);

      return new Response(JSON.stringify(response), { status: 200 });
    case "poweron":
      const powerOnResponse = await postPowerAction(action);

      return new Response(JSON.stringify(powerOnResponse), {
        status: 200,
      });
    default:
      return new Response("Invalid action", { status: 400 });
  }
}
