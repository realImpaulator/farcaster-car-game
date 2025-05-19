// app/api/frame/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  return NextResponse.json({
    version: 'vNext',
    content: {
      action: 'post',
      frames: [
        {
          image: {
            url: 'https://farcaster-car-game.vercel.app/screenshot.png', // Change this
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
