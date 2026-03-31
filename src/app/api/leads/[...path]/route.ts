import { NextRequest, NextResponse } from "next/server";

const LEADS_BASE_API_URL =
  process.env.NEXT_PUBLIC_LEADS_BASE_API_URL || "https://api-v2.houseofapps.ai/v1";
const APP_SECRET =
  process.env.NEXT_PUBLIC_APP_SECRET ||
  "SFMyNTY.g3QAAAACZAAEZGF0YXQAAAADbQAAAAlhY2NvdW50SWRtAAAAGDY5MWFkMjdjMzQ4ZjcwZjUxOGVlMDA1M20AAAAIa2V5c2V0SWRtAAAAJGJmYjgxODc4LTk0NTEtNGZiNi04MmE1LTE5OWIzN2YwNDI2OW0AAAAJcHJvamVjdElkbQAAACRiMTViMDI4MC0xNTA3LTQ4MjMtYTJjNS1hYmI1YTFhZjdmMDNkAAZzaWduZWRuBgAY4n0vnQE.TI8wGDMjNZrXDdri8fO-nupTZiSydltzxZn3l7DnSOw";
const LICENSE_KEY =
  process.env.NEXT_PUBLIC_LICENSE_KEY || "lic-IMK0yLFHOosnmvsb5X0I6C2O1Cwvig4DvyW";

const forward = async (
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => {
  const { path } = await ctx.params;
  const query = request.nextUrl.search || "";
  const targetUrl = `${LEADS_BASE_API_URL}/${path.join("/")}${query}`;

  const init: RequestInit = {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      appSecret: APP_SECRET,
      licenseKey: LICENSE_KEY,
    },
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const upstream = await fetch(targetUrl, init);
  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "application/json",
      "x-leads-appsecret-present": APP_SECRET ? "true" : "false",
      "x-leads-licensekey-present": LICENSE_KEY ? "true" : "false",
    },
  });
};

export async function GET(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(request, ctx);
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(request, ctx);
}
