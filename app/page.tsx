'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';

export default function Home() {
  useEffect(() => {
    // Notify Warpcast that the app is ready to be shown
    sdk.actions.ready();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center p-8">
      <h1 className="text-3xl font-bold mb-4">🚗 Farcaster Car Game</h1>
      <p className="text-lg">Ready to race? Play the game via a Farcaster Frame!</p>

      <div className="mt-8">
        <a
          className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800"
          href="https://warpcast.com/~/developers/mini-apps/manifest"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Warpcast
        </a>
      </div>
    </div>
  );
}
