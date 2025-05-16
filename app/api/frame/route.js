// app/api/frame/route.js

import { ImageResponse } from "@vercel/og";

function getFrameHtml({ image, buttons, post_url }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${image}" />
        ${buttons.map((label, i) => '<meta property="fc:frame:button:${i + 1}" content="${label}" />').join("\n")}
        <meta property="fc:frame:post_url" content="${post_url}" />
      </head>
      <body></body>
    </html>
  `;
}

function parseState(stateStr) {
  try {
    return JSON.parse(Buffer.from(stateStr, 'base64').toString('utf-8'));
  } catch {
    return { lane: 1, score: 0, lives: 3, tick: 0, highScore: 0 };
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

  // Speed up over time
  state.speed = 1 + Math.floor(state.tick / 10) * 0.2;

  // Increase bomb probability over time
  const coinProbability = Math.max(0.1, 0.3 - state.tick * 0.005);
  const bombProbability = 1 - coinProbability;

  // Add random item logic
  const rand = Math.random();
  if (!state.item && rand < 0.5) {
    state.item = {
      lane: Math.floor(Math.random() * 3),
      type: rand < coinProbability ? "coin" : "bomb",
      tick: state.tick + 1,
    };
  }

  // Collision detection
  if (state.item && state.item.tick === state.tick && state.item.lane === state.lane) {
    if (state.item.type === "coin") state.score++;
    else state.lives--;
    delete state.item;
  }

  if (state.lives <= 0 && state.score > state.highScore) {
    state.highScore = state.score;
  }

  const encodedState = encodeState(state);
  const imgUrl = `${process.env.NEXT_PUBLIC_HOST}/api/render?state=${encodedState}`;

	return new Response(getFrameHtml({
	  image: imgUrl,
	  buttons: state.lives > 0 ? ["⬅️ Move Left", "➡️ Move Right"] : ["🔁 Play Again"],
	  post_url: `${process.env.NEXT_PUBLIC_HOST}/api/frame?state=${encodedState}`,
	}), {
	  headers: {
		"Content-Type": "text/html",
		"Cache-Control": "no-store",
	  },
	});
  
}