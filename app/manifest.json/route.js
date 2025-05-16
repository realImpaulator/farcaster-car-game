export async function GET() {
  return new Response(
    JSON.stringify({
      name: "Farcaster Car Game",
      description: "A fun car racing mini-game with coins and bombs!",
      icon: "🚗", // Or use a URL to an image in your public folder
      hostedUrl: "https://farcaster-car-game.vercel.app",
      developer: {
        name: "Your Name",
        url: "https://github.com/realImpaulator",
      },
      requestedPermissions: ["notifications"],
      staticMetadata: {
        frames: [
          {
            url: "https://farcaster-car-game.vercel.app/api/frame",
          },
        ],
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
