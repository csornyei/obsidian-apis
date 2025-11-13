import { getHealth, postPowerAction } from "@/utils/wolApi";
import { PowerAction } from "@/utils/types";

export async function GET() {
  const healthResponse = await getHealth();
  return new Response(JSON.stringify(healthResponse), { status: 200 });
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
      return new Response("Start action not supported via API", {
        status: 400,
      });
    default:
      return new Response("Invalid action", { status: 400 });
  }
}
