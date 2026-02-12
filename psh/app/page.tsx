'use client';

import dynamic from 'next/dynamic';

const Playground = dynamic(() => import('./ui/playground'), { ssr: false });

export default function Home() {
  return <Playground />;
}
