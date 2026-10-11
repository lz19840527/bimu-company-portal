import type { Metadata } from 'next';
import HomePage from '@/components/portal/home';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return <HomePage />;
}
