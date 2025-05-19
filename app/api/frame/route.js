// app/api/frame/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json(); // 👈 required to consume the request body

  return NextResponse.json({
    version: 'vNext',
    content: {
      action: 'post',
      frames: [
        {
          image: {
            url: 'https://farcaster-car-game.vercel.app/icon.png',
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
