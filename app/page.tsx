// app/page.tsx
import Head from "next/head";
import GameClient from "./GameClient";

export default function Home() {
  const EMBED = {
    version: "next",
    imageUrl: "https://farcaster-car-game.vercel.app/opengraph.png",
    button: {
      title: "Play",
      action: {
        type: "launch_frame",
        url: "https://farcaster-car-game.vercel.app/",
        name: "Farcaster Car Game",
        splashImageUrl: "https://farcaster-car-game.vercel.app/icon.png",
        splashBackgroundColor: "#111"
      }
    }
  };

  return (
    <>
      <Head>
        <title> Farcaster Car Game</title>
        <meta name="fc:frame" content={JSON.stringify(EMBED)} />
        <meta name="description" content="Steer a car to collect coins and dodge bombs. Classic arcade vibes!" />
        <meta property="og:image" content={EMBED.imageUrl} />
        <meta property="og:title" content="Farcaster Car Game" />
        <meta property="og:description" content="Play directly inside Warpcast – it's a retro arcade racing game!" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-extrabold mb-4"> Farcaster Car Game</h1>
        <p className="text-lg max-w-xl">
          Ready to race? Play the game directly in a Farcaster Frame!
        </p>

        <div className="mt-8">
          <a
            href="https://warpcast.com/~/developers/mini-apps/manifest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            View on Warpcast
          </a>
        </div>

        <GameClient />
      </main>
    </>
  );
}
