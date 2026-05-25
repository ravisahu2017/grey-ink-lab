import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return handleProxy(req);
}

export async function POST(req: NextRequest) {
  return handleProxy(req);
}

export async function PUT(req: NextRequest) {
  return handleProxy(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxy(req);
}

async function handleProxy(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ success: false, error: "Missing path parameter" }, { status: 400 });
    }

    // Retrieve private keys from server env
    const key = process.env.WOOCOMMERCE_CONSUMER_KEY || process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
    const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET || process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;
    const rawBaseUrl = process.env.WP_BACKEND_BASE || process.env.NEXT_PUBLIC_WP_BACKEND_BASE;

    if (!rawBaseUrl) {
      return NextResponse.json({ success: false, error: "WP_BACKEND_BASE environment variable is not defined" }, { status: 500 });
    }

    // Append namespace to base URL
    const baseUrl = `${rawBaseUrl.replace(/\/$/, "")}/wp-json/wc/v3`;

    // Construct target URL
    const targetUrl = new URL(`${baseUrl}${path}`);

    // Forward all original query parameters (except the 'path' parameter itself)
    searchParams.forEach((value, name) => {
      if (name !== "path") {
        targetUrl.searchParams.set(name, value);
      }
    });

    // Securely attach auth credentials on the server side
    if (key && secret) {
      targetUrl.searchParams.set("consumer_key", key);
      targetUrl.searchParams.set("consumer_secret", secret);
    }

    // Forward request method and headers
    const method = req.method;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Forward request body if applicable
    let body: string | undefined;
    if (["POST", "PUT"].includes(method)) {
      body = await req.text();
    }

    console.log(`[PROXY] Forwarding ${method} request to: ${targetUrl.origin}${targetUrl.pathname}`);

    const response = await fetch(targetUrl.toString(), {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[PROXY] Error from WooCommerce: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { success: false, error: `WooCommerce responded with status ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[PROXY] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
