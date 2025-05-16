'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { sdk } from '@farcaster/frame-sdk';

export default function Home() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Frame metadata for Warpcast embedded frame preview
  const frameMetadata = {
    post_url: "https://farcaster-car-game.vercel.app/api/frame",
    image: "https://farcaster-car-game.vercel.app/icon.png",
    buttons: ["?? Move Left", "?? Move Right"]
  };

  return (
    <>
      <Head>
        <title>?? Farcaster Car Game</title>
        <meta
          property="fc:frame"
          content={encodeURIComponent(JSON.stringify(frameMetadata))}
        />
        <meta
          name="description"
          content="Steer a car to collect coins and dodge bombs. Classic arcade vibes!"
        />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-extrabold mb-4">?? Farcaster Car Game</h1>
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
      </main>
    </>
  );
}
