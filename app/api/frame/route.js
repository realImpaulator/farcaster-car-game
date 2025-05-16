// app/api/frame/route.js
import { getFrameMetadata } from "frames.js";
import { ImageResponse } from "@vercel/og";

function parseState(stateStr) {
  try {
    return JSON.parse(Buffer.from(stateStr, 'base64').toString('utf-8'));
  } catch {
    return { lane: 1, score: 0, lives: 3, tick: 0 };
  }
}

function encodeState(state) {
  return Buffer.from(JSON.stringify(state)).toString('base64');
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const body = await req.json();
  const state = parseState(searchParams.get("state") || "");

  const direction = body.untrustedData.buttonIndex === 1 ? -1 : 1;
  state.lane = Math.max(0, Math.min(2, state.lane + direction));
  state.tick++;

  // Add random item logic
  const rand = Math.random();
  if (!state.item && rand < 0.3) {
    state.item = {
      lane: Math.floor(Math.random() * 3),
      type: rand < 0.15 ? "coin" : "bomb",
      tick: state.tick + 1,
    };
  }

  // Collision detection
  if (state.item && state.item.tick === state.tick && state.item.lane === state.lane) {
    if (state.item.type === "coin") state.score++;
    else state.lives--;
    delete state.item;
  }

  const encodedState = encodeState(state);
  const imgUrl = `${process.env.NEXT_PUBLIC_HOST}/api/render?state=${encodedState}`;

  return new Response(
    getFrameMetadata({
      image: imgUrl,
      buttons: ["⬅️ Move Left", "➡️ Move Right"],
      post_url: `/api/frame?state=${encodedState}`,
    }),
    {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      },
    }
  );
}
