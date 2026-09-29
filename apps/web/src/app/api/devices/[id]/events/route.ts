import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Mock empty events array to keep the dashboard happy
  return NextResponse.json([]);
}
