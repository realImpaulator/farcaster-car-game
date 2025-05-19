'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';

export default function GameClient() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return null; // no UI, just triggers `sdk.ready()`
}