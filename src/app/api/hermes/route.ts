import { NextRequest, NextResponse } from 'next/server';

const HERMES_GATEWAY_URL = process.env.HERMES_GATEWAY_URL || 'http://100.122.147.84:8642';
const HERMES_API_KEY = process.env.HERMES_API_KEY;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const path = req.nextUrl.searchParams.get('path') || '/v1/chat/completions';

  try {
    const response = await fetch(`${HERMES_GATEWAY_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(HERMES_API_KEY ? { 'Authorization': `Bearer ${HERMES_API_KEY}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Hermes Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to communicate with Hermes Gateway' }, { status: 502 });
  }
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path') || '/v1/models';

  try {
    const response = await fetch(`${HERMES_GATEWAY_URL}${path}`, {
      method: 'GET',
      headers: {
        ...(HERMES_API_KEY ? { 'Authorization': `Bearer ${HERMES_API_KEY}` } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Hermes Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to communicate with Hermes Gateway' }, { status: 502 });
  }
}
