
// app/api/render/route.js
import { ImageResponse } from "@vercel/og";

function parseState(stateStr) {
  try {
    return JSON.parse(Buffer.from(stateStr, 'base64').toString('utf-8'));
  } catch {
    return { lane: 1, score: 0, lives: 3 };
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const state = parseState(searchParams.get("state") || "");

  return new ImageResponse(
    (
      <div style={{
        width: 600,
        height: 400,
        backgroundColor: "#111",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontSize: 28,
        padding: 20,
        color: "white",
      }}>
        <div style={{ textAlign: "center" }}>
          Score: {state.score} | Lives: {state.lives}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 100,
                height: 200,
                backgroundColor: i === state.lane ? "blue" : "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {state.item && state.item.lane === i && state.item.tick === state.tick
                ? state.item.type === "coin"
                  ? "💰"
                  : "💣"
                : ""}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 600,
      height: 400,
    }
  );
}