// app/api/frame/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json({
    version: 'vNext',
    content: {
      action: 'post',
      frames: [
        {
          image: {
            url: 'https://farcaster-car-game.vercel.app/screenshot.png', // replace with your image
          },
          buttons: [
            {
              label: 'Start Race',
              action: 'post',
            },
          ],
        },
      ],
    },
  });
}
