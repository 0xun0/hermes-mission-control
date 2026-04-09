import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hermes Mission Control',
  description: 'AI Agent Command Center',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-black relative h-dvh overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
